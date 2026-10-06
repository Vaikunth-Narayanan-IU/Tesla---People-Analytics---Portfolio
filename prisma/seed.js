const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEPARTMENTS = ['Engineering', 'Manufacturing', 'Supply Chain', 'People', 'Finance', 'Energy', 'Operations', 'Data', 'Sales', 'Design'];
const LOCATIONS = [
  { city: 'Palo Alto', state: 'CA', country: 'USA' },
  { city: 'Fremont', state: 'CA', country: 'USA' },
  { city: 'Austin', state: 'TX', country: 'USA' },
  { city: 'Sparks', state: 'NV', country: 'USA' },
  { city: 'Buffalo', state: 'NY', country: 'USA' },
  { city: 'New York', state: 'NY', country: 'USA' },
  { city: 'Remote', state: 'N/A', country: 'USA' },
];

const SOURCES = [
  { name: 'LinkedIn', cost: 100 },
  { name: 'Employee Referral', cost: 500 },
  { name: 'Tesla Careers', cost: 0 },
  { name: 'University Recruiting', cost: 2000 },
  { name: 'Indeed', cost: 150 },
  { name: 'Agency', cost: 15000 },
  { name: 'Outbound Sourcing', cost: 1000 },
  { name: 'Career Fair', cost: 5000 },
  { name: 'Internal Mobility', cost: 0 },
];

const STAGES = [
  { name: 'Application', order: 1 },
  { name: 'Recruiter Review', order: 2 },
  { name: 'Recruiter Screen', order: 3 },
  { name: 'Hiring Manager Review', order: 4 },
  { name: 'Interview', order: 5 },
  { name: 'Final Interview', order: 6 },
  { name: 'Offer', order: 7 },
  { name: 'Hire', order: 8 },
];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log('Seeding Database...');

  // 1. Clear existing
  await prisma.dataQualityResult.deleteMany();
  await prisma.hire.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.interview.deleteMany();
  await prisma.candidateStageHistory.deleteMany();
  await prisma.application.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.requisition.deleteMany();
  await prisma.source.deleteMany();
  await prisma.interviewer.deleteMany();
  await prisma.hiringManager.deleteMany();
  await prisma.recruiter.deleteMany();
  await prisma.location.deleteMany();
  await prisma.department.deleteMany();
  await prisma.recruitingStage.deleteMany();

  // 2. Insert Base Entities
  const dbDepts = [];
  for (const d of DEPARTMENTS) {
    dbDepts.push(await prisma.department.create({ data: { name: d } }));
  }

  const dbLocs = [];
  for (const l of LOCATIONS) {
    dbLocs.push(await prisma.location.create({ data: { city: l.city, state: l.state, country: l.country } }));
  }

  const dbSources = [];
  for (const s of SOURCES) {
    dbSources.push(await prisma.source.create({ data: { sourceName: s.name, estimatedCost: s.cost } }));
  }

  const dbStages = [];
  for (const st of STAGES) {
    dbStages.push(await prisma.recruitingStage.create({ data: { stageName: st.name, stageOrder: st.order } }));
  }

  // 3. Recruiters, HMs, Interviewers
  const dbRecruiters = [];
  for (let i = 1; i <= 15; i++) {
    dbRecruiters.push(await prisma.recruiter.create({
      data: { name: `Recruiter ${i}`, team: i % 3 === 0 ? 'Tech' : 'Business', email: `recruiter${i}@tesla.mock` }
    }));
  }

  const dbHMs = [];
  for (let i = 1; i <= 30; i++) {
    const dept = dbDepts[Math.floor(Math.random() * dbDepts.length)];
    dbHMs.push(await prisma.hiringManager.create({
      data: { name: `Manager ${i}`, departmentId: dept.id }
    }));
  }

  const dbInterviewers = [];
  for (let i = 1; i <= 50; i++) {
    const dept = dbDepts[Math.floor(Math.random() * dbDepts.length)];
    dbInterviewers.push(await prisma.interviewer.create({
      data: { name: `Interviewer ${i}`, departmentId: dept.id }
    }));
  }

  // 4. Requisitions (150)
  const dbReqs = [];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const now = new Date();

  for (let i = 1; i <= 150; i++) {
    const hm = dbHMs[Math.floor(Math.random() * dbHMs.length)];
    const req = await prisma.requisition.create({
      data: {
        reqCode: `REQ-${1000 + i}`,
        title: `Mock Role ${i}`,
        departmentId: hm.departmentId,
        locationId: dbLocs[Math.floor(Math.random() * dbLocs.length)].id,
        recruiterId: dbRecruiters[Math.floor(Math.random() * dbRecruiters.length)].id,
        hiringManagerId: hm.id,
        openedAt: randomDate(oneYearAgo, now),
        status: Math.random() > 0.8 ? 'CLOSED' : 'OPEN',
        targetHires: Math.floor(Math.random() * 3) + 1,
      }
    });
    dbReqs.push(req);
  }

  // 5. Candidates & Applications (Small sample: 500 for speed, usually 10k but SQLite inserts might be slow in sandbox without batching. We'll do 1000 for realistic UI, and add patterns)
  // Let's generate 2000 candidates to have enough data for charts but keep seeding < 10 seconds.
  console.log('Generating Candidates...');
  let totalCandidates = 2000;
  
  for (let i = 1; i <= totalCandidates; i++) {
    const req = dbReqs[Math.floor(Math.random() * dbReqs.length)];
    const source = dbSources[Math.floor(Math.random() * dbSources.length)];
    const applyDate = randomDate(req.openedAt, now);
    
    // Funnel drop-off logic
    let finalOrder = 1;
    let r = Math.random();
    
    // Pattern: Indeed has low conversion
    if (source.sourceName === 'Indeed') {
      if (r > 0.95) finalOrder = 8;
      else if (r > 0.90) finalOrder = 5;
      else if (r > 0.80) finalOrder = 3;
      else finalOrder = 1;
    } else if (source.sourceName === 'Employee Referral') { // High conversion
      if (r > 0.70) finalOrder = 8;
      else if (r > 0.50) finalOrder = 5;
      else finalOrder = 3;
    } else { // Average
      if (r > 0.95) finalOrder = 8;
      else if (r > 0.90) finalOrder = 7;
      else if (r > 0.80) finalOrder = 6;
      else if (r > 0.60) finalOrder = 5;
      else if (r > 0.40) finalOrder = 3;
      else finalOrder = 1;
    }

    const currentStageName = dbStages.find(s => s.stageOrder === finalOrder).stageName;

    const candidate = await prisma.candidate.create({
      data: {
        candidateCode: `CAND-${10000 + i}`,
        createdAt: applyDate,
        sourceId: source.id,
        currentStage: currentStageName,
        location: dbLocs[Math.floor(Math.random() * dbLocs.length)].city,
        yearsExperience: Math.floor(Math.random() * 10),
      }
    });

    await prisma.application.create({
      data: {
        candidateId: candidate.id,
        requisitionId: req.id,
        applicationDate: applyDate,
        status: finalOrder === 8 ? 'HIRED' : (Math.random() > 0.2 ? 'REJECTED' : 'ACTIVE')
      }
    });

    let currentEventTime = applyDate;

    // Stage History
    for (let order = 1; order <= finalOrder; order++) {
      const st = dbStages.find(s => s.stageOrder === order);
      // Pattern: HM Review takes a long time in Engineering
      const dept = dbDepts.find(d => d.id === req.departmentId);
      let daysToAdd = Math.random() * 5;
      if (st.stageName === 'Hiring Manager Review' && dept.name === 'Engineering') {
        daysToAdd += 10; // Bottleneck
      }

      const nextEventTime = new Date(currentEventTime.getTime() + daysToAdd * 86400000);
      
      await prisma.candidateStageHistory.create({
        data: {
          candidateId: candidate.id,
          requisitionId: req.id,
          stageId: st.id,
          enteredAt: currentEventTime,
          exitedAt: order === finalOrder ? null : nextEventTime,
          outcome: order === finalOrder ? null : 'MOVED_FORWARD'
        }
      });
      currentEventTime = nextEventTime;
    }

    // Interviews
    if (finalOrder >= 5) {
      await prisma.interview.create({
        data: {
          candidateId: candidate.id,
          requisitionId: req.id,
          interviewType: 'TECHNICAL',
          scheduledAt: new Date(applyDate.getTime() + 10 * 86400000),
          completedAt: new Date(applyDate.getTime() + 12 * 86400000),
          result: finalOrder >= 6 ? 'PASS' : 'FAIL',
          interviewerId: dbInterviewers[Math.floor(Math.random() * dbInterviewers.length)].id
        }
      });
    }

    // Offers & Hires
    if (finalOrder >= 7) {
      const offerDate = new Date(currentEventTime.getTime() + 2 * 86400000);
      const isAccepted = finalOrder === 8;
      await prisma.offer.create({
        data: {
          candidateId: candidate.id,
          requisitionId: req.id,
          offerDate,
          responseDate: new Date(offerDate.getTime() + 3 * 86400000),
          status: isAccepted ? 'ACCEPTED' : 'DECLINED',
          declineReason: isAccepted ? null : (Math.random() > 0.5 ? 'Compensation' : 'Competing Offer')
        }
      });

      if (isAccepted) {
        await prisma.hire.create({
          data: {
            candidateId: candidate.id,
            requisitionId: req.id,
            hireDate: new Date(offerDate.getTime() + 3 * 86400000),
            startDate: new Date(offerDate.getTime() + 20 * 86400000),
          }
        });
      }
    }
  }

  // Generate Data Quality Issues
  console.log('Generating Data Quality Results...');
  await prisma.dataQualityResult.createMany({
    data: [
      { testName: 'offer_date_before_hire_date', status: 'PASS', affectedRows: 0, severity: 'HIGH' },
      { testName: 'candidate_without_source', status: 'FAIL', affectedRows: 38, severity: 'HIGH' },
      { testName: 'stale_candidates_in_review', status: 'FAIL', affectedRows: 124, severity: 'MEDIUM' },
      { testName: 'missing_hiring_manager', status: 'PASS', affectedRows: 0, severity: 'HIGH' },
      { testName: 'duplicate_candidate_emails', status: 'FAIL', affectedRows: 12, severity: 'LOW' }
    ]
  });

  console.log('Seed Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
