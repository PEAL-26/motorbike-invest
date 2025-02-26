PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_investments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`income` real NOT NULL,
	`profit` real NOT NULL,
	`bonus` real,
	`duration` integer NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
--> statement-breakpoint
INSERT INTO `__new_investments`("id", "name", "amount", "income", "profit", "bonus", "duration", "start_date", "end_date", "status", "created_at", "updated_at") SELECT "id", "name", "amount", "income", "profit", "bonus", "duration", "start_date", "end_date", "status", "created_at", "updated_at" FROM `investments`;--> statement-breakpoint
DROP TABLE `investments`;--> statement-breakpoint
ALTER TABLE `__new_investments` RENAME TO `investments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;