CREATE TABLE `incomes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`investment_id` integer NOT NULL,
	`code` text NOT NULL,
	`number` integer NOT NULL,
	`income` real NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`payment_date` integer,
	`income_date` integer NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `investments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`income` real,
	`profit` real,
	`duration` integer,
	`start_date` integer,
	`end_date` integer,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
