CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text(256) NOT NULL,
	`password` text(256) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);