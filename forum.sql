-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 11 2026 г., 01:10
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `forum`
--

-- --------------------------------------------------------

--
-- Структура таблицы `blocked_users`
--

CREATE TABLE `blocked_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `blocked_by_id` int(11) NOT NULL,
  `reason` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `parent_id`) VALUES
(10, 'Honkai Star Rail', 'Родительская категория по хср', NULL),
(11, 'Genshin Impact', 'Родительская по геншину', NULL),
(12, 'Zenless Zone Zero', 'Родительская по ззз', NULL),
(30, 'Новости и анонсы', 'Новости и анонсы', 10),
(31, 'Гайды для новичков', 'Гайды для новичков', 10),
(32, 'Билды персонажей', 'Билды персонажей', 10),
(33, 'Световые конусы', 'Световые конусы', 10),
(34, 'Реликвии и планарки', 'Реликвии и планарки', 10),
(35, 'Отряды и синергии', 'Отряды и синергии', 10),
(36, 'Эндгейм-контент', 'Эндгейм-контент', 10),
(37, 'Лор и сюжет', 'Лор и сюжет', 10),
(38, 'Мемы и юмор', 'Мемы и юмор', 10),
(39, 'Скриншоты и творчество', 'Скриншоты и творчество', 10),
(40, 'Новости и обновления', 'Новости и обновления', 11),
(41, 'Помощь новичкам', 'Помощь новичкам', 11),
(42, 'Персонажи', 'Персонажи', 11),
(43, 'Артефакты', 'Артефакты', 11),
(44, 'Оружие', 'Оружие', 11),
(45, 'Бездна', 'Бездна', 11),
(46, 'Исследование мира', 'Исследование мира', 11),
(47, 'Лор Тейвата', 'Лор Тейвата', 11),
(48, 'Кооператив', 'Кооператив', 11),
(49, 'Скриншоты и творчество', 'Скриншоты и творчество', 11),
(50, 'Мемы и оффтоп', 'Мемы и оффтоп', 11),
(51, 'Новости и патчи', 'Новости и патчи', 12),
(52, 'Агенты', 'Агенты', 12),
(53, 'Банбу', 'Банбу', 12),
(54, 'Экипировка', 'Экипировка', 12),
(55, 'Команды и билды', 'Команды и билды', 12),
(56, 'Сюжет и лор', 'Сюжет и лор', 12),
(57, 'Скриншоты и творчество', 'Скриншоты и творчество', 12),
(58, 'Мемы и юмор', 'Мемы и юмор', 12),
(59, 'Общение', 'Общение', NULL),
(60, 'Знакомства', 'Знакомства', 59),
(61, 'Болталка', 'Болталка', 59),
(62, 'Аниме и манга', 'Аниме и манга', 59),
(63, 'Технический раздел', 'Технический раздел ', NULL),
(64, 'Работа форума', 'Работа форума', 63),
(65, 'Ошибки и баги', 'Ошибки и баги', 63),
(66, 'Предложения по улучшению', 'Предложения по улучшению', 63),
(67, 'Вопросы администрации', 'Вопросы администрации', 63);

-- --------------------------------------------------------

--
-- Структура таблицы `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('pending','reviewed','dismissed') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp(),
  `reason_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `theme` varchar(45) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `moder_id` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `theme`, `message`, `moder_id`, `status`) VALUES
(1, 'ASD', 'sad@gmail.com', 'Asd', 'asd', NULL, 'pending');

-- --------------------------------------------------------

--
-- Структура таблицы `dislikes`
--

CREATE TABLE `dislikes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `dislikes`
--

INSERT INTO `dislikes` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(6, 314, 2, '2026-06-08 21:58:32');

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `datee` date DEFAULT NULL,
  `id_u` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `datee`, `id_u`) VALUES
(1, 'Веб ивент', 'Веб ивент с подарками', '2026-04-09', 2),
(2, 'Ноый патч', 'Игровое обновление', '2026-04-22', 2),
(3, 'Годовщина', 'Годовщина игры ', '2026-04-26', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(28, 258, 2, '2026-06-07 04:09:29'),
(29, 314, 10, '2026-06-09 04:41:00'),
(30, 314, 2, '2026-06-09 05:58:31');

-- --------------------------------------------------------

--
-- Структура таблицы `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `sender_id`, `type`, `post_id`, `topic_id`, `text`, `is_read`, `created_at`) VALUES
(9, 89, 2, 'like', 258, NULL, NULL, 0, '2026-06-06 20:09:29'),
(10, 89, 10, 'reply', 313, NULL, NULL, 0, '2026-06-07 21:41:03'),
(11, 10, 2, 'like', 314, NULL, NULL, 0, '2026-06-08 21:58:31'),
(12, 10, 2, 'dislike', 314, NULL, NULL, 0, '2026-06-08 21:58:32');

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `parent_post_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `topic_id`, `author_id`, `parent_post_id`, `content`, `created_at`, `updated_at`, `is_deleted`, `image1`, `image2`) VALUES
(258, 77, 89, NULL, 'Кто уже успел посмотреть детали нового баннера? Интересно насколько персонаж будет полезен в текущей мете.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(259, 78, 90, NULL, 'Собрал небольшой гайд для новичков по распределению ресурсов в первые недели игры.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(260, 79, 91, NULL, 'Какой сет реликвий сейчас показывает лучший результат на Ахерон?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(261, 80, 92, NULL, 'Стоит ли выбивать сигнатурный конус или достаточно бесплатных альтернатив?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(262, 81, 93, NULL, 'Покажите ваши лучшие пачки для прохождения Зала Забвения.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(263, 82, 94, NULL, 'На каком этапе эндгейма вы сейчас остановились?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(264, 83, 95, NULL, 'После последней сюжетной арки осталось очень много вопросов по истории Пенаконии.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(265, 84, 96, NULL, 'Нашел смешной баг во время катсцены.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, '1780609440609.jpg', NULL),
(266, 85, 97, NULL, 'Делюсь красивым скриншотом с нового ивента.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, '1778941963213.jpg', NULL),
(267, 86, 98, NULL, 'Что думаете о последних новостях от разработчиков?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(268, 87, 99, NULL, 'Есть ли смысл начинать играть сейчас новичку?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(269, 88, 100, NULL, 'Какого персонажа вы считаете самым недооцененным?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(270, 89, 101, NULL, 'Собираю статистику по прохождению сложного контента.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(271, 90, 102, NULL, 'Какой отряд используете для фарма ресурсов?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(272, 91, 103, NULL, 'После обновления производительность стала лучше или хуже?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(273, 92, 104, NULL, 'Какие артефакты сейчас стоит фармить в первую очередь?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(274, 93, 105, NULL, 'Поделитесь любимыми персонажами из Фонтейна.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(275, 94, 106, NULL, 'Наконец-то закрыл Бездну на все звезды.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(276, 95, 107, NULL, 'Какие секретные места в Тейвате вы недавно нашли?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, '1780485184418.jpg', NULL),
(277, 96, 108, NULL, 'Интересно узнать ваши теории о будущем сюжета.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(278, 97, 109, NULL, 'Кто хочет побегать в кооперативе вечером?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(279, 98, 110, NULL, 'Нарисовал небольшой арт любимого персонажа.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, '1778941963213.jpg', NULL),
(280, 99, 111, NULL, 'Самый забавный момент за последнее время в игре?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(281, 100, 112, NULL, 'Какие изменения патча понравились больше всего?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(282, 101, 113, NULL, 'Как вам новый агент после релиза?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(283, 102, 114, NULL, 'Каких банбу используете чаще всего?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(284, 103, 115, NULL, 'Подскажите хороший билд через аномалию.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(285, 104, 116, NULL, 'Какая команда сейчас показывает лучший урон?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(286, 105, 117, NULL, 'Обсудим сюжет последней главы.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(287, 106, 118, NULL, 'Сделал несколько красивых кадров в фоторежиме.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, '1780609440609.jpg', NULL),
(288, 107, 89, NULL, 'Какой мем по игре за последнее время вам понравился больше всего?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(289, 108, 90, NULL, 'Давайте познакомимся. Откуда вы?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(290, 109, 91, NULL, 'Во что кроме гача-игр сейчас играете?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(291, 110, 92, NULL, 'Посоветуйте хорошее аниме на вечер.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(292, 111, 93, NULL, 'Как давно вы на форуме?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(293, 112, 94, NULL, 'Есть предложение по улучшению системы уведомлений.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(294, 113, 95, NULL, 'После обновления заметил несколько мелких багов.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(295, 114, 96, NULL, 'Хотелось бы увидеть больше настроек профиля.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(296, 115, 97, NULL, 'Спасибо администрации за проделанную работу.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(297, 116, 98, NULL, 'Есть вопрос по правилам форума.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(298, 117, 99, NULL, 'Какая категория кажется вам самой полезной?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(299, 118, 100, NULL, 'Нужна помощь с настройкой уведомлений.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(300, 119, 101, NULL, 'Не могу загрузить аватар, кто сталкивался?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(301, 120, 102, NULL, 'Предлагаю добавить систему достижений.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(302, 121, 103, NULL, 'Как вам новый дизайн разделов?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(303, 122, 104, NULL, 'Хотелось бы темную тему с большим количеством настроек.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(304, 123, 105, NULL, 'Интересно узнать мнение пользователей о последних изменениях.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(305, 124, 106, NULL, 'Насколько активно вы пользуетесь личными сообщениями?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(306, 125, 107, NULL, 'Какие функции стоит реализовать в первую очередь?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(307, 126, 108, NULL, 'Есть идеи по улучшению поиска по форуму.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(308, 127, 109, NULL, 'Проверяю работу системы цитирования.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(309, 128, 110, NULL, 'Как часто вы заходите на форум?', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(310, 129, 111, NULL, 'Поделитесь впечатлениями от последних обновлений форума.', '2026-06-07 04:07:19', '2026-06-06 20:07:19', 0, NULL, NULL),
(311, 130, 10, NULL, 'ОЧень сомнительное событие, я не уверен что это норм', '2026-06-08 05:40:09', NULL, 0, NULL, NULL),
(312, 130, 10, NULL, 'Согласен', '2026-06-08 05:40:35', NULL, 0, NULL, NULL),
(313, 77, 10, 258, 'Это же сливы. Они недостоверны', '2026-06-08 05:41:03', NULL, 0, NULL, NULL),
(314, 131, 10, NULL, 'Ееееее КАРТИНКИ', '2026-06-09 04:02:20', '2026-06-08 20:40:49', 0, '1780948940749-image1.jpg', '1780951249299-image2.jpg'),
(315, 131, 2, 314, 'хахахах', '2026-06-09 05:58:27', NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `report_reasons`
--

CREATE TABLE `report_reasons` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `report_reasons`
--

INSERT INTO `report_reasons` (`id`, `name`) VALUES
(1, 'Спам'),
(2, 'Оскорбления'),
(3, 'Флуд'),
(4, 'Оффтоп'),
(5, 'Нецензурная лексика'),
(6, 'Ложная информация'),
(7, 'Реклама'),
(8, 'Дублирующий пост'),
(9, 'Нарушение правил форума'),
(10, 'Нежелательный контент'),
(11, 'Провокация / токсичное поведение'),
(12, 'Другое');

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'Admin', 'Admin'),
(2, 'User', 'User'),
(3, 'Moderator', 'its Mario'),
(4, 'Super Admin', 'ohhhh yeees');

-- --------------------------------------------------------

--
-- Структура таблицы `setings`
--

CREATE TABLE `setings` (
  `id` int(11) NOT NULL,
  `version` varchar(10) DEFAULT NULL,
  `patch` varchar(45) DEFAULT NULL,
  `id_u` int(11) DEFAULT NULL,
  `date_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `setings`
--

INSERT INTO `setings` (`id`, `version`, `patch`, `id_u`, `date_update`) VALUES
(1, '4.2', '1777114030661.png', 2, '2026-05-09 20:53:13');

-- --------------------------------------------------------

--
-- Структура таблицы `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `category_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_closed` tinyint(1) DEFAULT 0,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `topics`
--

INSERT INTO `topics` (`id`, `title`, `category_id`, `author_id`, `created_at`, `updated_at`, `is_closed`, `description`) VALUES
(77, 'Версия 3.5: первые впечатления от обновления', 30, 89, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем новый контент, персонажей и изменения баланса.'),
(78, 'Каких персонажей ждете в следующих баннерах?', 30, 90, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Делимся ожиданиями и предположениями по будущим баннерам.'),
(79, 'Стоит ли копить нефрит на следующий патч?', 30, 91, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждение планов по накоплению ресурсов.'),
(80, 'Полезные советы для игроков после пролога', 31, 92, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Небольшой набор рекомендаций для быстрого развития аккаунта.'),
(81, 'Как эффективно тратить энергию новичку', 31, 93, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Разбираем приоритеты фарма на ранних этапах.'),
(82, 'Частые ошибки начинающих Первопроходцев', 31, 94, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Список распространенных ошибок и способы их избежать.'),
(83, 'Лучший билд на Касторию после релиза', 32, 95, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем конусы, реликвии и приоритет характеристик.'),
(84, 'Сборка Ахерон без сигнатурного конуса', 32, 96, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Насколько комфортно играть без фирменного оружия.'),
(85, 'Стоит ли вкладываться в Цзинлю в 2026 году?', 32, 97, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Актуальность персонажа в текущей мете.'),
(86, 'Топ световых конусов для персонажей Пути Разрушения', 33, 98, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Сравниваем популярные варианты экипировки.'),
(87, 'Какие 4★ конусы недооценены?', 33, 99, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Интересные варианты для экономных игроков.'),
(88, 'Какой сет лучше для Ахерон сейчас?', 34, 100, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Сравнение актуальных комплектов.'),
(89, 'Самые сложные пещеры для фарма реликвий', 34, 101, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем эффективность и удобство фарма.'),
(90, 'Лучшая команда для прохождения Иллюзии конца', 35, 102, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Делимся рабочими составами.'),
(91, 'Какие саппорты универсальны почти для любого отряда?', 35, 103, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждение полезных персонажей поддержки.'),
(92, 'Ваш рекорд в Чистом вымысле', 36, 104, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Сравниваем результаты и стратегии.'),
(93, 'Как пройти сложный этап Иллюзии конца?', 36, 105, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Советы и тактики для прохождения.'),
(94, 'Кто на самом деле управляет Эонами?', 37, 106, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Теории и обсуждение сюжета.'),
(95, 'Самые загадочные персонажи сюжета', 37, 107, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем скрытые детали истории.'),
(96, 'Самый смешной момент из ваших призывов', 38, 108, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Делимся удачными и неудачными крутками.'),
(97, 'Что думаете о следующем регионе?', 40, 109, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем слухи и ожидания.'),
(98, 'Какие изменения патча понравились больше всего?', 40, 110, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждение свежего обновления.'),
(99, 'Советы игрокам после 45 ранга приключений', 41, 111, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Что стоит делать в первую очередь.'),
(100, 'Как быстро накопить мору?', 41, 112, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Полезные способы заработка ресурсов.'),
(101, 'Лучшие персонажи для исследования мира', 42, 113, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Кого удобнее всего брать в открытый мир.'),
(102, 'Насколько силен Невиллет в текущей мете?', 42, 114, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем сильные стороны героя.'),
(103, 'Ваш любимый персонаж и почему?', 42, 115, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Небольшое знакомство с участниками форума.'),
(104, 'Какой самый удачный артефакт вам выпадал?', 43, 116, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Хвастаемся удачными роллами.'),
(105, 'Фарм артефактов или талантов?', 43, 117, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Что важнее улучшать в первую очередь.'),
(106, 'Лучшее бесплатное оружие для новичков', 44, 118, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Подборка доступных вариантов.'),
(107, 'Стоит ли выбивать сигнатурное оружие?', 44, 89, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Плюсы и минусы оружейного баннера.'),
(108, '12 этаж бездны: ваши составы', 45, 90, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Делимся успешными командами.'),
(109, 'Самая раздражающая комната бездны', 45, 91, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждение сложных этапов.'),
(110, 'Сколько процентов закрытия у вашего любимого региона?', 46, 92, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Показываем прогресс исследования.'),
(111, 'Кто такой Скирк на самом деле?', 47, 93, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Теории по сюжету Тейвата.'),
(112, 'Ищем игроков для совместных боссов', 48, 94, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Оставляйте UID и сервер.'),
(113, 'Какие изменения патча понравились вам больше всего?', 51, 95, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем свежее обновление.'),
(114, 'Следующий агент выглядит слишком сильным?', 51, 96, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Первые впечатления и прогнозы.'),
(115, 'Лучшие агенты для старта аккаунта', 52, 97, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Кого стоит развивать в первую очередь.'),
(116, 'Ваш любимый агент по геймплею', 52, 98, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Делимся впечатлениями от персонажей.'),
(117, 'Какого Банбу используете чаще всего?', 53, 99, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем полезных помощников.'),
(118, 'Какие диски сейчас считаются лучшими?', 54, 100, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Разбираем актуальную экипировку.'),
(119, 'Универсальные составы для большинства активностей', 55, 101, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Подборка удобных команд.'),
(120, 'Лучшая команда вокруг Эллен', 55, 102, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждаем синергию персонажей.'),
(121, 'Самые интересные тайны Нью-Эриду', 56, 103, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Сюжетные загадки и теории.'),
(122, 'Давайте знакомиться!', 60, 104, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Расскажите немного о себе.'),
(123, 'Во что играете кроме гача-игр?', 61, 105, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Свободное общение участников.'),
(124, 'Лучшее аниме этого сезона', 62, 106, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Делимся рекомендациями.'),
(125, 'Какие манги читаете прямо сейчас?', 62, 107, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Обсуждение интересных тайтлов.'),
(126, 'Небольшое предложение по улучшению форума', 66, 108, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Идея по развитию функционала сайта.'),
(127, 'Ошибка при загрузке аватара', 65, 109, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Столкнулся с проблемой при смене изображения профиля.'),
(128, 'Как работает система жалоб?', 67, 110, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Есть несколько вопросов к администрации.'),
(129, 'Спасибо за новый дизайн форума', 64, 111, '2026-06-07 03:45:49', '2026-06-07 03:45:49', 0, 'Хочу поделиться впечатлениями от обновления.'),
(130, 'Изменение баланса', 30, 10, '2026-06-08 05:39:27', '2026-06-08 05:39:27', 0, 'В последнем патчи понерфили старых персов. Что думаете?'),
(131, 'Как собрать Эванессу', 30, 10, '2026-06-08 05:41:57', '2026-06-08 07:14:12', 0, 'Помогите рил пожалуйста');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_r` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_blocked` tinyint(1) DEFAULT 0,
  `uid` int(11) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `avatarca` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `id_r`, `created_at`, `updated_at`, `is_blocked`, `uid`, `about`, `avatarca`) VALUES
(2, 'Tunez', 'redinov4@gmail.com', '$2b$10$FfsRV1dodNItuuwQNfPBGeiJiyGCT/SIjkQP5Gjv5WZFLbuM6Ymk.', 1, '2026-04-09 08:52:10', '2026-06-08 07:28:11', 0, 666, '666', '1778463138212.png'),
(10, 'test', 'd.redinov@gmail.com', '$2b$10$IybmS2Hl1JbuyVJdLmY/ReEG5/s6POOf2p6C0Enrz0DJYtMo9MG0S', 2, '2026-04-21 23:18:32', '2026-06-08 07:32:43', 0, 666, 'sad', '1780875075470.jpg'),
(89, 'AstralFox', 'astralfox@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(90, 'NebulaKnight', 'nebulaknight@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(91, 'PixelSamurai', 'pixelsamurai@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(92, 'CrimsonWolf', 'crimsonwolf@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(93, 'SilverNova', 'silvernova@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(94, 'QuantumByte', 'quantumbyte@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(95, 'ShadowMeteor', 'shadowmeteor@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(96, 'CyberFalcon', 'cyberfalcon@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(97, 'LunarRider', 'lunarrider@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(98, 'IronPhoenix', 'ironphoenix@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(99, 'VoidHunter', 'voidhunter@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(100, 'CrystalBlade', 'crystalblade@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(101, 'StormBreaker', 'stormbreaker@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(102, 'NightComet', 'nightcomet@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(103, 'TitanSpark', 'titanspark@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(104, 'FrostDragon', 'frostdragon@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(105, 'SolarPhantom', 'solarphantom@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(106, 'EchoRaven', 'echoraven@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(107, 'VortexMage', 'vortexmage@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(108, 'OmegaPulse', 'omegapulse@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(109, 'GhostCipher', 'ghostcipher@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(110, 'BlazeHunter', 'blazehunter@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(111, 'ArcticTiger', 'arctictiger@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(112, 'DarkOrbit', 'darkorbit@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(113, 'StarNomad', 'starnomad@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(114, 'RubyVanguard', 'rubyvanguard@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(115, 'ThunderCrow', 'thundercrow@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(116, 'ZenithWalker', 'zenithwalker@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(117, 'NovaSpectre', 'novaspectre@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg'),
(118, 'CosmoReaper', 'cosmoreaper@example.com', '123456', 2, '2026-06-07 03:36:44', '2026-06-07 03:54:58', 0, NULL, NULL, '1778463009036.jpg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `blocked_users`
--
ALTER TABLE `blocked_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `blocked_by_id` (`blocked_by_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Индексы таблицы `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_complaints_reason` (`reason_id`),
  ADD KEY `fk_reports_topic` (`topic_id`);

--
-- Индексы таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moder_id` (`moder_id`);

--
-- Индексы таблицы `dislikes`
--
ALTER TABLE `dislikes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_u` (`id_u`);

--
-- Индексы таблицы `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `parent_post_id` (`parent_post_id`);

--
-- Индексы таблицы `report_reasons`
--
ALTER TABLE `report_reasons`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `setings`
--
ALTER TABLE `setings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_u` (`id_u`);

--
-- Индексы таблицы `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`id_r`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `blocked_users`
--
ALTER TABLE `blocked_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT для таблицы `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT для таблицы `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `dislikes`
--
ALTER TABLE `dislikes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=316;

--
-- AUTO_INCREMENT для таблицы `report_reasons`
--
ALTER TABLE `report_reasons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `setings`
--
ALTER TABLE `setings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `blocked_users`
--
ALTER TABLE `blocked_users`
  ADD CONSTRAINT `blocked_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blocked_users_ibfk_2` FOREIGN KEY (`blocked_by_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `complaints_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_complaints_reason` FOREIGN KEY (`reason_id`) REFERENCES `report_reasons` (`id`),
  ADD CONSTRAINT `fk_reports_topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`moder_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `dislikes`
--
ALTER TABLE `dislikes`
  ADD CONSTRAINT `dislikes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `dislikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`id_u`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`);

--
-- Ограничения внешнего ключа таблицы `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`parent_post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `setings`
--
ALTER TABLE `setings`
  ADD CONSTRAINT `setings_ibfk_1` FOREIGN KEY (`id_u`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topics_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_r`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
