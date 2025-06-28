# Tech Stack & Concepts

## Tech Stack

- Frontend: React

- Backend: Node.js

- Database: PostgreSQL, Prisma.

- Styling: Tailwind CSS

- API: Next.js API routes

- [Deployment: Vercel / Asura Hosting (soon)](/docs/Getting-Started/Deployment)

---

## **Database Schema (Prisma)**

The single source of truth for the database structure is the `prisma/schema.prisma` file. It defines all models, relations, and indexes.

<details>
<summary><strong>Click to expand/collapse the full Prisma schema</strong></summary>

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Users {
  slug                     String     @id @db.VarChar(100)
  created_at               DateTime   @default(now())
  email                    String     @unique @db.VarChar(255)
  passwordHash             String     @db.VarChar(255)
  displayName              String     @db.VarChar(100)
  isAdmin                  Boolean    @default(false)
  passwordResetToken       String?    @unique @db.VarChar(100)
  passwordResetExpires     DateTime?
  emailVerified            Boolean?   @default(false)
  emailVerificationToken   String?    @unique
  emailVerificationExpires DateTime?
  orders                   Orders[]
  wishlist                 Products[]
  wishlistSets             Sets[]     @relation("UserWishlistSets")
  @@index([email])
  @@index([isAdmin])
}

model RequestLogs {
  slug         Int      @id @default(autoincrement())
  identifier String
  timestamp  DateTime @default(now())

  @@index([identifier, timestamp])
}

model Categories {
  slug        String     @id @db.VarChar(100)
  name        String     @db.VarChar(100)
  img         String?    @default("") @db.VarChar(255)
  is_featured Boolean    @default(false)
  created_at  DateTime   @default(now())
  Products    Products[]

  @@index([is_featured])
  @@index([name]) // For category name searches/sorting
}

model Config {
  slug                     String   @id @default("general") @db.VarChar(50)
  tos                      String?  @default("") @db.Text
  about_us                 String?  @default("") @db.Text
  mission                  String?  @default("") @db.Text
  partners_description     String?  @default("") @db.Text
  connect_description      String?  @default("") @db.Text
  delivery_policies        String[] @default([])
  checkoutEnableCod        Boolean  @default(true)
  checkoutEnableCreditCard Boolean  @default(false)
}

model Products {
  created_at         DateTime   @default(now())
  slug               String     @id @db.VarChar(100)
  name               String     @db.VarChar(100)
  price              Float      @db.DoublePrecision
  category           String     @db.VarChar(100)
  description        String     @default("") @db.Text
  discount           Int        @default(0) @db.SmallInt
  quantity           Int        @default(0) @db.SmallInt
  quality            Decimal    @default(0) @db.Decimal(2, 1)
  items_sold         Int        @default(0) @db.SmallInt
  featured_promotion Boolean    @default(false)
  top_selling        Boolean    @default(false)
  images             String[]   @default([])
  options            Json?
  categoryRef        Categories @relation(fields: [category], references: [slug], onDelete: Cascade)
  wishlistedBy       Users[]
  orderItems         OrderItems[]
  related_products   Products[] @relation("ProductRelations")
  related_to         Products[] @relation("ProductRelations")
  setComponents      SetComponents[]
  @@index([category])
  @@index([featured_promotion])
  @@index([top_selling])
  @@index([name])
  @@index([price])
  @@index([discount])
  @@index([created_at])
  @@index([quantity])
  @@index([items_sold])
  @@index([category, price])
  @@index([category, name])
  @@index([category, created_at])
  @@index([quantity, name])
}

model Sets {
  slug               String     @id @db.VarChar(100)
  name               String     @db.VarChar(100)
  images             String[]   @default([])
  made_by            String     @db.VarChar(100)
  description        String     @db.Text
  tags               String[]   @default([])
  created_at         DateTime   @default(now())
  price              Float      @default(0) @db.DoublePrecision
  discount           Float      @default(0) @db.DoublePrecision
  items_sold         Int        @default(0) @db.SmallInt
  featured_promotion Boolean    @default(false)
  top_selling        Boolean    @default(false)
  components         SetComponents[]
  orderItems         OrderItems[]
  related_products   Sets[]     @relation("SetRelations")
  related_to         Sets[]     @relation("SetRelations")
  wishlistedBy       Users[]    @relation("UserWishlistSets")
  @@index([made_by])
  @@index([name])
  @@index([created_at])
  @@index([price])
  @@index([discount])
  @@index([items_sold])
  @@index([featured_promotion])
  @@index([top_selling])
}

model SetComponents {
  setSlug    String @db.VarChar(100)
  productSlug String @db.VarChar(100)
  quantity   Int    @db.SmallInt // The quantity of this product needed for one set

  set     Sets     @relation(fields: [setSlug], references: [slug], onDelete: Cascade)
  product Products @relation(fields: [productSlug], references: [slug], onDelete: Cascade)

  @@id([setSlug, productSlug])
}

model Team {
  slug       String   @id @db.VarChar(100)
  name       String   @db.VarChar(100)
  role       String?  @db.VarChar(100)
  img        String?  @db.VarChar(255)
  created_at DateTime @default(now())
}

model Partners {
  slug       String   @id @db.VarChar(100)
  img        String   @db.VarChar(255)
  created_at DateTime @default(now())
}

model Gallery {
  slug       String   @id @db.VarChar(100)
  name       String   @db.VarChar(100)
  img        String   @db.VarChar(255)
  created_at DateTime @default(now())
}

model Themes {
  slug           String   @id @default("general") @db.VarChar(50)
  themeStringObj Json     @default("{\"primary\":\"blue\",\"secondary\":\"violet\"}")
  headerTextColor String?  @default("text-black") @db.VarChar(100)
  img            String?  @default("") @db.VarChar(255)
  created_at     DateTime @default(now())
}

model Orders {
  slug           String   @id @db.VarChar(100)
  created_at     DateTime @default(now())
  name           String   @db.VarChar(100)
  email          String   @db.VarChar(255)
  address        String   @db.VarChar(255)
  city           String   @db.VarChar(100)
  region         String?  @db.VarChar(100)
  postal_code    String?  @db.VarChar(20)
  notes          String?  @db.VarChar(500)
  payment_method String   @db.VarChar(50)
  shipping_fee   Decimal  @db.Decimal(10, 2)
  sub_total      Decimal  @db.Decimal(10, 2)
  phone          String   @db.VarChar(20)
  status         String   @db.VarChar(20)
  admin_note     String?  @db.Text
  items_qty      Int      @db.SmallInt

  // Discount fields
  discount_code   String?  @db.VarChar(50)     // The code that was applied
  discount_amount Decimal  @default(0) @db.Decimal(10, 2) // Amount saved

  idempotencyKey String? @unique @db.VarChar(100) // The key to prevent duplicate orders

  user            Users          @relation(fields: [email], references: [email], onDelete: Cascade)
  orderItems      OrderItems[]
  discountCodeRef DiscountCodes? @relation("OrderDiscountCode", fields: [discount_code], references: [slug])

  @@index([created_at])
  @@index([email])
  @@index([created_at, email])
  @@index([status])
  @@index([discount_code])
}

model OrderItems {
  slug         String  @id @default(cuid())
  order_slug   String  @db.VarChar(100)
  product_slug String? @db.VarChar(100) // Made optional
  set_slug     String? @db.VarChar(100) // New field for sets
  item_type    String  @db.VarChar(20) // "product" or "set"
  quantity     Int     @db.SmallInt
  unit_price   Decimal @db.Decimal(10, 2) // Price at time of order

  order   Orders    @relation(fields: [order_slug], references: [slug], onDelete: Cascade)
  product Products? @relation(fields: [product_slug], references: [slug], onDelete: Cascade)
  set     Sets?     @relation(fields: [set_slug], references: [slug], onDelete: Cascade)

  // Ensure only one of product_slug or set_slug is set
  @@unique([order_slug, product_slug, set_slug])
  @@index([order_slug])
  @@index([product_slug])
  @@index([set_slug])
  @@index([item_type])
}

model DiscountCodes {
  slug           String    @id @db.VarChar(50) // The actual discount code users enter
  created_at     DateTime  @default(now())
  expires_at     DateTime?

  // Discount configuration
  discount_type  String    @db.VarChar(20) // "percentage" or "fixed_amount"
  discount_value Decimal   @db.Decimal(10, 2) // Either percentage (0-100) or fixed amount

  // Usage limits
  max_uses          Int?    @db.SmallInt // Total times code can be used (0 = unlimited)
  used_count        Int     @default(0) @db.SmallInt // How many times it's been used

  // Minimum requirements
  minimum_order_amount Decimal? @db.Decimal(10, 2) // Minimum cart value to apply

  // Status and metadata
  is_active Boolean @default(true)

  // Relations
  orders             Orders[]            @relation("OrderDiscountCode") // Track which orders used this code

  @@index([slug])
  @@index([is_active])
  @@index([expires_at])
  @@index([discount_type])
}

```

</details>

---

## **Folder Structure**

This project utilizes the Next.js App Router, which organizes the application primarily within the `src/app` directory. The structure is designed to separate concerns, making it scalable and maintainable.

<details>
<summary><strong>Click to expand/collapse the detailed folder structure</strong></summary>

Here is a comprehensive breakdown of the project's architecture:

- **Root Directory (`/`)**

  - `.env.local`: **(Untracked)** Local environment variables. Contains secrets like database URLs and API keys.
  - `.env.local.example`: An example file for environment variables. New developers should copy this to `.env.local`.
  - `.eslintrc.json`: Configuration for ESLint, our code linter.
  - `.gitignore`: Specifies files and folders to be ignored by Git (e.g., `node_modules`, `.env.local`).
  - `jsconfig.json`: Configures path aliases (e.g., `@/components`) for easier imports.
  - `next.config.mjs`: The main configuration file for Next.js.
  - `package.json`: Lists project dependencies, metadata, and scripts (e.g., `npm run dev`).
  - `postcss.config.mjs`: Configuration for PostCSS, used by Tailwind CSS.
  - `README.md`: This documentation file.

- **`backups/`**: Directory for storing database or application backups. _(Note: This should typically be in `.gitignore` to avoid committing large backup files to the repository)._

- **`prisma/`**: Contains all database-related configurations for the Prisma ORM.

  - `schema.prisma`: The primary schema file defining all database models and relations.
  - `dev.db`: **(Untracked)** A local SQLite database file, likely used for development.

- **`public/`**: Stores static assets that are publicly accessible from the root URL.
- **`uploads/`**: Stores assets of the store's items.

  - `icon.png`: Application icon, likely used as a favicon.

- **`setup-files/`**: Contains utility scripts for project setup or maintenance.

  - `makeAdmin.js`: A script to grant admin privileges to a user.
  - `seedFakePosts.js`: A script to populate the database with dummy data for testing.

- **`src/`**: The main source code for the entire application.
  - `middleware-out.js`: A build artifact from Next.js middleware compilation.
  - **`app/`**: The core of the Next.js application, using the App Router.
    - `layout.js`, `page.js`, `error.js`, `loading.js`, `not-found.js`: Root-level special files that define the main layout, homepage, and global states.
    - **`about/`**: The "About Us" page.
    - **`account/`**: The user's private account section.
      - `orders/`: Displays a user's order history and details for a specific order (`[slug]`).
      - `wishlist/`: The user's product wishlist.
    - **`admin/`**: The protected admin dashboard for managing the store.
      - `components/`: React components used exclusively within the admin dashboard.
        - `forms/`: A well-organized set of forms for creating/editing every data model (Products, Categories, etc.).
      - `hooks/`: Custom React hooks specific to the admin panel.
      - `utils/`: Helper functions for admin-related tasks.
    - **`api/`**: Backend API endpoints (Route Handlers).
      - `auth/`: Handles user authentication (login, signout, session check).
      - `backup/`: API endpoint to trigger a server backup.
      - `uploads/[...path]`: API endpoint to get uploaded files.
      - `cron/`: Endpoints designed to be called by scheduled jobs (e.g., cleanup tasks).
      - `tables/`: A generic, dynamic API for performing CRUD operations on database tables, likely used by the admin panel.
      - `user/`: API routes for user-specific actions like managing wishlists and orders.
    - **`checkout/`**: The order checkout page and flow.
    - **`contact/`**: The "Contact Us" page.
    - **`login/`**: The user login page.
    - **`sets/`**: Pages for displaying product sets/bundles.
    - **`store/`**: The main product browsing pages, including the main store page and individual product detail pages (`[slug]`).
    - **`tos/`**: The "Terms of Service" page.
  - **`actions/`**: Contains Next.js Server Actions, used for server-side form submissions and mutations.
    - `authActions.js`: Server actions related to authentication.
  - **`assets/`**: Static assets like images and fonts that are part of the build process.
  - **`components/`**: Global, reusable React components shared across the application.
    - `account-components/`: Components specific to the user account section.
    - `home-components/`: Components used only on the homepage.
    - `others-components/`: Common, shared components like `Header`, `Footer`, `Spinner`, etc.
    - `store-components/`: Components used in the product browsing and detail pages.
  - **`context/`**: React Context providers for managing global state.
    - `ConfirmModal.js`: A context for a global confirmation dialog.
  - **`helpers/`**: General-purpose utility functions that are not tied to a specific framework feature.
  - **`hooks/`**: Global, reusable React hooks.
  - **`lib/`**: Core library code, services, and backend utilities.
    - `auth.js`, `session.js`: Core authentication logic.
    - `db.js`: Initializes and exports the Prisma client instance.
    - `email.js`: Service for sending emails.
    - `rate-limiter-db.js`: Logic for API rate limiting.
  - **`styles/`**: Global stylesheets.
    - `globals.css`: Main stylesheet for Tailwind CSS and other global styles.

</details>

---

_Last updated on June 24, 2025 by Ayman._
