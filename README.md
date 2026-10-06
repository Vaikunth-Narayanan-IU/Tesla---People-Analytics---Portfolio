# Tesla People Intelligence

A polished, interactive full-stack portfolio application demonstrating Data and People Analytics capabilities. This application simulates an internal recruiting analytics and decision platform.

## 1. Problem Statement
Recruiting teams often lack trustworthy, actionable data. Generic HR dashboards show high-level metrics but fail to provide granular pipeline health, bottleneck identification, or data-quality assurance. This application solves that by providing an interactive, engineering-driven analytics workbench that connects upstream candidate data with downstream operational decisions.

## 2. Recruiting Lifecycle Modeled
The platform models a complete recruiting funnel:
`Application → Recruiter Review → Recruiter Screen → Hiring Manager Review → Interview → Final Interview → Offer → Hire`

## 3. Architecture

```
Next.js Frontend (React Server Components + Client Components)
      ↓
Next.js Server Actions (API Layer)
      ↓
Prisma ORM (Data Access)
      ↓
PostgreSQL / SQLite (Relational Database)
      ↓
Recharts & Framer Motion (Visualizations & Animations)
```

## 4. Database Schema
Built using Prisma, the schema is highly normalized:
- `Department`, `Location`, `Source`
- `Requisition`, `Candidate`, `Application`
- `RecruitingStage`, `CandidateStageHistory`
- `Interview`, `Offer`, `Hire`
- `DataQualityResult`

## 5. Analytics Methodology
Metrics are generated via SQL/Prisma aggregations directly from the relational data, avoiding static CSV dependencies. We use median calculations for stage duration to handle outliers, and conversion rates are calculated progressively across the funnel stages.

## 6. SQL Metrics Implemented
- **Time to Fill**: Requisition `closedAt` - `openedAt`
- **Offer Acceptance Rate**: Accepted Offers / Total Offers
- **Interview-to-Offer**: Unique Candidates Offered / Unique Candidates Interviewed

## 7. Data-Quality Framework
Analytics is only as good as the underlying data. The platform runs automated integrity checks:
- Candidates without a source
- Missing hiring managers
- Offer dates before hire dates
- Stale candidates in review

## 8. Decision Rules (Rules-Based Engine)
The platform surfaces actionable intelligence, for example:
- *IF* days in Hiring Manager Review > 5, *THEN* suggest "Nudge Manager" on the Recruiter Workbench.
- *IF* requisition open > 45 days with 0 active candidates, *THEN* flag as "Critical".

## 9. Responsible Analytics Considerations
- **No Protected Characteristics:** Race, gender, and age data are deliberately excluded from ranking or candidate tables.
- **Explainable Metrics:** Complex metrics are visible through the SQL Lab to ensure transparency.
- **Decision Support:** The platform nudges recruiters but does not automate rejection or hiring decisions.

## 10. How to Run Locally

1. Clone the repository.
2. Install dependencies: `npm install`
3. Generate the database and seed it: `npx prisma db push && npx prisma db seed`
4. Run the development server: `npm run dev`
5. Open `http://localhost:3000`

## 11. Database Configuration (PostgreSQL / SQLite)

The project currently uses **SQLite** by default to allow for frictionless local evaluation without Docker or Supabase configuration.

**To switch to PostgreSQL for Production / Vercel deployment:**
1. Open `prisma/schema.prisma`.
2. Change the provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Add your Supabase or Postgres URL to `.env`:
   `DATABASE_URL="postgresql://user:password@host:5432/dbname"`
4. Run `npx prisma db push` to initialize the PostgreSQL database.

## 12. Deployment
The application can be seamlessly deployed to Vercel:
1. Push the code to GitHub.
2. Connect the repository to Vercel.
3. Add `DATABASE_URL` to the Vercel environment variables.
4. Set the build command to `npx prisma generate && npx prisma db push && next build`.
