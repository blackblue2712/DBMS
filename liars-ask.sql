-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 19, 2019 at 07:48 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liars-ask`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `body` text NOT NULL,
  `owner` int(11) NOT NULL,
  `votes` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(225) DEFAULT NULL,
  `fullname` varchar(225) DEFAULT NULL,
  `photo` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `body`, `owner`, `votes`, `created`, `email`, `fullname`, `photo`) VALUES
(12, 'SQL supports qualifying a column by prefixing the reference with either the full table name:\n\n```\nSELECT tbl_names.id, tbl_section.id, name, section\nFROM tbl_names\nJOIN tbl_section ON tbl_section.id = tbl_names.id \n```', 2, 0, '2019-10-19 03:46:36', 'danghuunghia2712@gmail.com', 'Lalatina\'s', 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422117/xhtpi8nhdjewgziztx4r.png'),
(13, 'In your `SELECT` statement you need to preface your id with the table you want to choose it from.\n\n```\nSELECT tbl_names.id, name, section \nFROM tbl_names\nINNER JOIN tbl_section \n   ON tbl_names.id = tbl_section.id\n```\n\nOR\n\n```\nSELECT tbl_section.id, name, section \nFROM tbl_names\nINNER JOIN tbl_section \n   ON tbl_names.id = tbl_section.id\n```', 2, 0, '2019-10-19 04:14:04', 'danghuunghia2712@gmail.com', 'Lalatina\'s', 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422117/xhtpi8nhdjewgziztx4r.png'),
(14, 'You would do that by providing a fully qualified name, e.g.:\n\n```\nSELECT tbl_names.id as id, name, section FROM tbl_names, tbl_section WHERE tbl_names.id = tbl_section.id\n```', 2, 0, '2019-10-19 04:50:30', 'danghuunghia2712@gmail.com', 'Lalatina\'s', 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422117/xhtpi8nhdjewgziztx4r.png'),
(15, 'What you are probably really wanting to do here is use the union operator like this:\n\n```\n(select ID from Logo where AccountID = 1 and Rendered = \'True\')\n  union\n  (select ID from Design where AccountID = 1 and Rendered = \'True\')\n  order by ID limit 0, 51\n```\n\n![ruby](https://res.cloudinary.com/ddrw0yq95/image/upload/v1571423572/mcfp0fgknyefr9ohed00.png)\n\nHere\'s the docs for it [https://dev.mysql.com/doc/refman/5.0/en/union.html](https://dev.mysql.com/doc/refman/5.0/en/union.html)\n\n', 5, 0, '2019-10-19 05:20:01', 'lars27399@gmail.com', 'blackblue', 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571423590/vapb55v6p2sqwb3wjgc7.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `image_url` varchar(225) NOT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `image_url`, `owner`) VALUES
(19, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422643/bisf1zdavcypx8vof0mu.png', 2),
(22, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422775/fxj3xtlnieewusaoq8s4.jpg', 2),
(23, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422784/mnffoympd4rlvvuij6ce.png', 2),
(24, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422813/rcajcnng0kazhdibsy6m.png', 2),
(25, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422827/idstbtvedebjpzxgbwn2.png', 2),
(26, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422839/jdgsi2jewwqqzb9btnbx.jpg', 2),
(27, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422847/o2gbfgfieuua7jo3bydy.jpg', 2),
(28, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422858/ic9ezpfsrtlaswlyzigp.jpg', 2),
(29, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422867/mlmyoeiuplxjyixropov.jpg', 2),
(30, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422878/lcgylvwe4o1ij4epokc4.jpg', 2),
(31, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422892/joerlw0adr8rpuha0jyo.jpg', 2),
(32, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422910/g4ozyhp9p4imvcrfk859.jpg', 2),
(33, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422920/n3sdang4jok8sv5mln4z.jpg', 2),
(34, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422936/dwcy4efq3idd31ptfmhb.jpg', 2),
(35, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422944/atvevq0k5jv43nzmmskr.jpg', 2),
(36, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571423572/mcfp0fgknyefr9ohed00.png', 5);

-- --------------------------------------------------------

--
-- Table structure for table `privileges`
--

CREATE TABLE `privileges` (
  `id` int(11) NOT NULL,
  `name` char(3) NOT NULL,
  `permission` int(1) NOT NULL,
  `description` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `privileges`
--

INSERT INTO `privileges` (`id`, `name`, `permission`, `description`) VALUES
(1, '---', 0, 'No permission'),
(2, 'rwe', 7, 'read write execute');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` varchar(225) NOT NULL,
  `body` text NOT NULL,
  `tags` varchar(225) DEFAULT NULL,
  `anonymousTags` varchar(225) DEFAULT NULL,
  `owner` int(11) NOT NULL,
  `answers` varchar(225) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  `votes` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `title`, `body`, `tags`, `anonymousTags`, `owner`, `answers`, `created`, `views`, `votes`) VALUES
(1, 'How to reponsive web with @media css- ask for syntax', '```\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n```', NULL, '[\"css\",\"responsive\"]', 2, NULL, '2019-10-19 02:27:19', 0, NULL),
(2, '1052: Column \'id\' in field list is ambiguous', 'I have 2 tables. `tbl_names` and `tbl_section` which has both the `id` field in them. How do I go about selecting the `id` field, because I always get this error:\n\n```\n1052: Column \'id\' in field list is ambiguous\n```\n\nHere\'s my query:\n\n```\nSELECT id, name, section\n  FROM tbl_names, tbl_section \n WHERE tbl_names.id = tbl_section.id\n```\n\nI could just select all the fields and avoid the error. But that would be a waste in performance. What should I do?\n\n', NULL, '[\"mysql\",\"sql\",\"join\",\"database\",\"mysql-1052\"]', 2, '[12,13,14,15]', '2019-10-19 02:41:38', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL,
  `description` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullname` varchar(225) DEFAULT NULL,
  `hashed_password` varchar(225) NOT NULL,
  `salt` varchar(225) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL,
  `photo` varchar(225) DEFAULT 'https://res.cloudinary.com/dged6fqkf/image/upload/v1570503167/kbecwqwgxojfrwcclyym.gif',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `bio` varchar(225) DEFAULT NULL,
  `quotes` varchar(225) DEFAULT NULL,
  `roles` int(11) NOT NULL DEFAULT '1',
  `isGuildMakeAQuestion` tinyint(1) NOT NULL DEFAULT '0',
  `activeLink` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `fullname`, `hashed_password`, `salt`, `created_at`, `modified_at`, `photo`, `status`, `bio`, `quotes`, `roles`, `isGuildMakeAQuestion`, `activeLink`) VALUES
(1, 'lalatina@gmail.com', NULL, '95d0d6ab81bde91365520a5f54f888bb5ea65ca7d1506faeb31291fc519284d1', 't630fd1d', NULL, NULL, 'https://res.cloudinary.com/dged6fqkf/image/upload/v1570503167/kbecwqwgxojfrwcclyym.gif', 1, NULL, NULL, 1, 0, NULL),
(2, 'danghuunghia2712@gmail.com', 'Lalatina\'s', '45b61a13748390082a2b1121d6db185dddd0dc36d469ac55a0ac58db8d8db531', 'tyz8ldwy', '2019-10-17 17:17:28', NULL, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571422117/xhtpi8nhdjewgziztx4r.png', 1, '```\nconst { quotes, bio, id } = props.userPayload;\n    \nconst [fquotes, setQuotes] = useState(quotes);\nconst [showNotify, setShowNotify] = useState(\"\");\n\n```', 'Being alone is not synonymous with being lonely', 2, 0, NULL),
(5, 'lars27399@gmail.com', 'blackblue', '4be527749eb08467a825e63ff40eb622d683866d2562d29f8cb2cfc0a936af1c', 'ykxf2fkl', '2019-10-18 18:26:21', NULL, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1571423590/vapb55v6p2sqwb3wjgc7.jpg', 1, NULL, NULL, 1, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roles` (`roles`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `galleries_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roles`) REFERENCES `privileges` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
