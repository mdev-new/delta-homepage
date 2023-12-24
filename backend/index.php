<?php

$db = new SQLite3('database.db');

# Users

$sql = <<<EOF
CREATE TABLE IF NOT EXISTS users(
	ID PRIMARY KEY NOT NULL,
	username TEXT,
	password TEXT,
	email TEXT,
	class TEXT,
	bakalari_username TEXT,
	bakalari_pass TEXT,
	mtb_username TEXT,
	mtb_pass TEXT,
	moodle_username TEXT,
	moodle_pass TEXT,
	domjudge_username TEXT,
	domjudge_pass TEXT,
	role TEXT,
	topgun BOOLEAN,
	post_ids TEXT,
	search_history TEXT,
	following TEXT,
	followers TEXT,
	likes TEXT,
	comments TEXT);
EOF;

$db->exec($sql);

# Social

$sql = <<<EOF
CREATE TABLE IF NOT EXISTS social_posts(
	id INTEGER PRIMARY KEY,
	poster INT,
	text_content TEXT,
	binary_content BLOB,
	likes TEXT,
	comments TEXT
);
EOF;

$db->exec($sql);

# Helpdesk

$sql = <<<EOF
CREATE TABLE IF NOT EXISTS helpdesk_posts(
	id INTEGER PRIMARY KEY,
	poster INT,
	content TEXT,
	agrees TEXT -- text representation of an array of ints (ids)
);
EOF;

$db->exec($sql);
