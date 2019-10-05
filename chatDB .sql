-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2019 at 06:03 PM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `friend_from` int(11) NOT NULL,
  `friend_to` int(11) NOT NULL,
  `status` enum('requested','accepted','rejected','') NOT NULL,
  `chat_room` varchar(256) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `friend_from`, `friend_to`, `status`, `chat_room`, `created_at`) VALUES
(3, 11, 10, 'accepted', '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chat_room` varchar(256) NOT NULL,
  `message_from` int(11) NOT NULL,
  `message_to` int(11) NOT NULL,
  `message_body` text NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `chat_room`, `message_from`, `message_to`, `message_body`, `is_read`, `created_at`) VALUES
(23, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'hello man', 0, '2019-09-22 19:31:05'),
(24, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'hello there', 0, '2019-09-22 19:31:09'),
(25, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'you there?', 0, '2019-09-22 20:09:46'),
(26, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'yes', 0, '2019-09-22 20:10:02'),
(27, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'what happened?', 0, '2019-09-22 20:18:46'),
(28, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'hecsajkfda', 0, '2019-09-22 20:26:39'),
(29, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'cdsafdsafsdf', 0, '2019-09-22 20:26:53'),
(30, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'fdsAfsdfsd', 0, '2019-09-22 20:26:55'),
(31, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'fdsfsdfsd', 0, '2019-09-22 20:26:57'),
(32, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'fsdfsdfs', 0, '2019-09-22 20:26:59'),
(33, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'fsdfsdfs', 0, '2019-09-22 20:27:01'),
(34, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'fsdfsfsd', 0, '2019-09-22 20:27:04'),
(35, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'fzfdsgffsghfsdgeg', 0, '2019-09-22 20:27:07'),
(36, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'fSDfdsfgsdgdfsvfcdgdfsg', 0, '2019-09-22 20:27:10'),
(37, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'gdfsgrtuyhfgxhd', 0, '2019-09-22 20:27:12'),
(38, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'fdsfsfsf', 0, '2019-09-22 20:27:15'),
(39, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'fsDfsdfdfddddddddddddddddddddddddddddddd', 0, '2019-09-22 20:27:19'),
(40, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 10, 11, 'dsds', 0, '2019-09-22 20:27:43'),
(41, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'dddddd', 0, '2019-09-22 20:27:47'),
(42, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'hello', 0, '2019-09-22 21:49:17'),
(43, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'you there?', 0, '2019-09-22 21:49:40'),
(44, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'repy?', 0, '2019-09-22 21:50:55'),
(45, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'dsdsd', 0, '2019-09-29 22:08:34'),
(46, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'dsds', 0, '2019-09-29 22:08:36'),
(47, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'guyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', 0, '2019-10-02 16:51:53'),
(48, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'dasdaddsa', 0, '2019-10-02 16:51:59'),
(49, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'fdsfsdfsdfs', 0, '2019-10-02 16:54:39'),
(50, '4a7e131fa789f36f19795dd1172945073276a07ddd632b5c362498d6ae44fa5215', 11, 10, 'sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\ndsad\nasd\nas\ndas\nd\nad\nda', 0, '2019-10-02 16:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` text NOT NULL,
  `online` tinyint(1) NOT NULL,
  `picture` varchar(256) NOT NULL,
  `last_online` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `user_id`, `status`, `online`, `picture`, `last_online`) VALUES
(9, 10, 'alive', 0, 'rahul-1568298081494', '0000-00-00 00:00:00'),
(10, 11, 'hungery', 0, 'Rahul Vanmali-1568469860534', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `createOn` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createOn`) VALUES
(10, 'rahul', 'rahul@gmail.com', '$2a$10$38FaiAy7Les7u9Tf0dNkwO8i7ynruQ9bhdCewzi9gkBqjOg6niP7y', '2019-09-07 16:11:28'),
(11, 'Rahul Vanmali', 'vanmalirahul1996@gmail.com', '$2a$10$asTZA0Lml1lAuO4Kf0NbhOnM6i5F3MSJCD/ApMOgxhRH.SqV0l3bq', '2019-09-07 16:17:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
