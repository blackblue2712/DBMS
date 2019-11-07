-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 07, 2019 at 06:44 PM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddAnAnswer` (IN `body` TEXT, IN `owner` INT, IN `email` VARCHAR(225), IN `photo` VARCHAR(225), IN `fullname` VARCHAR(225))  BEGIN
	INSERT INTO answers (body, owner, email, photo, fullname) VALUES(body, owner, email, photo, fullname);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddAQuestion` (IN `title` VARCHAR(225), IN `body` TEXT, IN `owner` INT)  BEGIN
	INSERT INTO questions (title, body, owner) VALUES (title, body, owner);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteQuestion` (IN `idQues` INT)  BEGIN
	DELETE FROM tags_relationships WHERE typeId = idQues;
   	DELETE FROM questions WHERE id = idQues;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllUsers` ()  BEGIN
   	SELECT email, fullname, photo, id, created_at
    FROM users;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getAnnouncements` ()  BEGIN
	SELECT * FROM announcements ORDER BY created DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getQuestions` ()  BEGIN
	SELECT * FROM questions ORDER BY created DESC;
    SELECT name, typeId, tagId FROM tags_relationships, tags
    WHERE tags_relationships.tagId = tags.id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserById` (IN `idUser` INT)  BEGIN
	SELECT * FROM users WHERE id = idUser;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getYourQuestions` (IN `idQues` INT)  BEGIN
	SELECT id, title FROM questions WHERE owner = idQues;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `postSignup` (IN `i_email` VARCHAR(50), IN `i_salt` VARCHAR(225), IN `i_hashed_password` VARCHAR(225))  BEGIN
	DECLARE existedId INT DEFAULT 0;
	SELECT id INTO existedId FROM users WHERE email = i_email;
    IF existedId != 0 THEN
    	SELECT "User with that email was existed" AS message;
    ELSE
    	INSERT INTO users (email, salt, hashed_password)
        	    VALUES (i_email, i_salt, i_hashed_password);
        SELECT "Signup successfully" AS message;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `requestRelatedAcmId` (`acmId` INT)  BEGIN
	SELECT * FROM announcements WHERE id = acmId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `requestRelatedQuestionId` (IN `quesId` INT)  BEGIN
	SELECT * FROM questions WHERE questions.id = quesId;
	SELECT tags.name AS tagName, tags_relationships.id, tags_relationships.tagId
    FROM questions, tags, tags_relationships
    WHERE questions.id = quesId
    AND questions.id = tags_relationships.typeId
    AND tags_relationships.tagId = tags.id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAcm` (IN `title` VARCHAR(225), IN `body` TEXT, IN `isImportant` TINYINT(1), IN `anonymousTags` VARCHAR(225), IN `acmId` INT)  BEGIN
	IF body != "" THEN
    	UPDATE announcements 
        SET title = title, isImportant = isImportant, anonymousTags = anonymousTags, body = body
        WHERE id = acmId;
    ELSE
        UPDATE announcements 
        SET title = title, isImportant = isImportant, anonymousTags = anonymousTags
        WHERE id = acmId;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUserInfoAndRelatedAnswers` (IN `fullname` VARCHAR(225), IN `photo` VARCHAR(225), IN `userId` INT)  BEGIN
    UPDATE users SET fullname=fullname , photo=photo WHERE id=userId;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `AddAnAnnouncement` (`title` VARCHAR(225), `body` TEXT, `isImportant` TINYINT(1), `anonymousTags` VARCHAR(225), `owner` INT) RETURNS INT(11) BEGIN
	DECLARE insertedId INT DEFAULT 0;
	INSERT INTO announcements (title, body, isImportant, anonymousTags, owner) VALUES (title, body, isImportant, anonymousTags, owner);
    SET insertedId = LAST_INSERT_ID();
    RETURN insertedId;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `AddAnAnswer` (`body` TEXT, `owner` INT) RETURNS INT(11) BEGIN
	DECLARE insertedId INT DEFAULT 0;
	INSERT INTO answers (body, owner) VALUES(body, owner);
    SET insertedId = LAST_INSERT_ID();
    RETURN insertedId;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `AddAQuestionAfterAddTags` (`title` VARCHAR(225), `body` TEXT, `owner` INT) RETURNS INT(11) BEGIN
	INSERT INTO questions (title, body, owner) VALUES (title, body, owner);
    RETURN LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `CheckAndAddUnExistsTag` (`tag` VARCHAR(225)) RETURNS INT(11) BEGIN
	DECLARE existsTag INT DEFAULT 0;
    DECLARE insertedId INT DEFAULT 0;
    SELECT id INTO existsTag FROM tags WHERE name = tag;
    IF existsTag <= 0 THEN
    	INSERT INTO tags (name) VALUES (tag);
        SET insertedId = LAST_INSERT_ID();
    ELSE 
   		RETURN existsTag;
	END IF;
    RETURN insertedId;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(225) NOT NULL,
  `body` text NOT NULL,
  `tags` varchar(225) DEFAULT NULL,
  `isImportant` tinyint(1) NOT NULL DEFAULT '1',
  `owner` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `views` int(11) NOT NULL DEFAULT '0',
  `anonymousTags` varchar(225) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `body`, `tags`, `isImportant`, `owner`, `status`, `views`, `anonymousTags`, `created`) VALUES
(3, 'THÔNG BÁO HỌP LỆ 2020', 'Chào các bạn!\r\n\r\n\r\nBCH xin thông báo Họp lệ và Họp Cố Vấn chung.\r\n\r\n1. Thời gian: 16h10 ngày 23/10/2019\r\n2. Địa điểm: LT/ Khoa CNTT && TT\r\n\r\n**Bạn nào vắng mặt vui lòng nhắn lại với BCH**\r\n\r\n\r\n*Chúc các bạn một ngày vui vẻ.*', NULL, 1, 2, 1, 0, '[\"HopLe\",\"CoVan\"]', '2019-10-24 01:16:34'),
(6, 'Hội thi Olympic tiếng Anh và chương trình Thắp sáng ước mơ', 'Chào các bạn,\n\n\n#### I. Hội thi Olympic tiếng Anh: \nĐoàn trường triển khai Hội thi Olympic tiếng Anh trong học sinh, sinh viên thành phố Cần Thơ năm 2019.\n1. Hình thức thi trắc nghiệm trực tuyến tại website https://olympictienganh2019.ctu.edu.vn/  \n2. Thời gian thi: hệ thống mở từ 9g00 chủ nhật đến 22g00 thứ bảy tuần kế tiếp\nTuần 1: ngày 20/10 đến ngày 26/10\nTuần 2: ngày 27/10 đến ngày 2/11\nTuần 3: ngày 3/11 đến ngày 9/11\n3. Quyền lợi sinh viên khi tham gia\nCộng điểm rèn luyện học kỳ I, năm học 2019-2020 vào mục Tham gia các kỳ thi chuyên ngành, thi Olympic đối với các sinh viên đạt kết quả như sau:\n- Cộng ở mức Tham gia (2 điểm) đối với thí sinh làm bài đạt từ 10/30 câu hỏi ở vòng trực tuyến. \n- Cộng ở mức Đạt giải cấp trường (4 điểm) đối với các sinh viên có tên trong danh sách 05 sinh viên đạt điểm cao nhất mỗi tuần của trường.\n- Cộng ở mức Đạt giải cấp cao hơn (7 điểm) đối với thí sinh đạt giải Nhất, Nhì, Ba mỗi tuần và xuất sắc của Hội thi.\nCấp giấy chứng nhận xét hoàn thành 01 tiêu chí trong tiêu chuẩn “Hội nhập tốt” của phong trào \"Sinh viên 5 tốt\".\n-Cấp chứng nhận của Đoàn trường cho thí sinh làm bài đạt từ 15/30 câu hỏi ở vòng trực tuyến.\n- Cấp chứng nhận của Thành đoàn cho thí sinh làm bài đạt từ 20/30 câu hỏi ở vòng trực tuyến.\nThông tin chi tiết các bạn có thể tìm hiểu qua đường link\nhttps://yu.ctu.edu.vn/hoat-dong-doan/13-hoi-nhap-quoc-te/1787-hoi-thi-olympic-tieng-anh-hssv-tpct-2019.html \n\n#### II. Chương trình thắp sáng ước mơ:\nDưới đây là link from nộp hồ sơ cho các hoàn cảnh khó khăn để Đoàn khoa tổng hợp gửi về Đoàn trường nên bạn nào khó khăn hãy nộp nhé!\n\n[https://docs.google.com/forms/d/e/1FAIpQLScljDwfvmW5VMtez3bDPzUV4vMIxYh1tPjzHf5K6yMbVbtgHw/viewform  ](https://docs.google.com/forms/d/e/1FAIpQLScljDwfvmW5VMtez3bDPzUV4vMIxYh1tPjzHf5K6yMbVbtgHw/viewform  )\n\nThân mến.', NULL, 0, 2, 1, 0, '[\"olympic\",\"doan\",\"dream\"]', '2019-10-24 06:24:40'),
(9, 'Xóa tên những thành viên không hoạt động tình nguyện', '#### Thông báo quan trọng:\n\nHiện tại ban chấp hành đội thanh niên tình nguyện của khoa mình đang bắt đầu **xóa tên** những ai không còn hoạt động nữa. Ở lớp mình có rất nhiều bạn đã từng là đội viên mà hiện không hoặc ít hoạt', NULL, 1, 2, 1, 0, '[\"doan\"]', '2019-10-25 11:07:07');

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `body` text NOT NULL,
  `owner` int(11) NOT NULL,
  `votes` varchar(225) DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `body`, `owner`, `votes`, `created`) VALUES
(12, 'SQL supports qualifying a column by prefixing the reference with either the full table name:\n\n```\nSELECT tbl_names.id, tbl_section.id, name, section\nFROM tbl_names\nJOIN tbl_section ON tbl_section.id = tbl_names.id \n```', 2, ' 2 5', '2019-10-19 03:46:36'),
(13, 'In your `SELECT` statement you need to preface your id with the table you want to choose it from.\n\n```\nSELECT tbl_names.id, name, section \nFROM tbl_names\nINNER JOIN tbl_section \n   ON tbl_names.id = tbl_section.id\n```\n\nOR\n\n```\nSELECT tbl_section.id, name, section \nFROM tbl_names\nINNER JOIN tbl_section \n   ON tbl_names.id = tbl_section.id\n```', 2, '', '2019-10-19 04:14:04'),
(14, 'You would do that by providing a fully qualified name, e.g.:\n\n```\nSELECT tbl_names.id as id, name, section FROM tbl_names, tbl_section WHERE tbl_names.id = tbl_section.id\n```', 2, '', '2019-10-19 04:50:30'),
(15, 'What you are probably really wanting to do here is use the union operator like this:\n\n```\n(select ID from Logo where AccountID = 1 and Rendered = \'True\')\n  union\n  (select ID from Design where AccountID = 1 and Rendered = \'True\')\n  order by ID limit 0, 51\n```\n\n![ruby](https://res.cloudinary.com/ddrw0yq95/image/upload/v1571423572/mcfp0fgknyefr9ohed00.png)\n\nHere\'s the docs for it [https://dev.mysql.com/doc/refman/5.0/en/union.html](https://dev.mysql.com/doc/refman/5.0/en/union.html)\n\n', 5, '', '2019-10-19 05:20:01'),
(16, 'Just add this: \n\n```\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n```', 2, '', '2019-10-22 09:17:06'),
(17, 'test answer', 2, '', '2019-10-22 09:19:11'),
(18, 'another answer\r\n```\r\nlet clearText = () => {\r\n    console.log(\"clear text editor here\");\r\n}\r\n```\r\n![image](https://res.cloudinary.com/ddrw0yq95/image/upload/v1571423572/mcfp0fgknyefr9ohed00.png)', 2, '', '2019-10-22 09:20:24'),
(19, 'I\'ve seen it done in a kind of iffy, but pretty reliable way. Basically, an element is set to use a specific font and a string is set to that element. If the font set for the element does not exist, it takes the font of the parent element. So, what they do is measure the width of the rendered string. If it matches what they expected for the desired font as opposed to the derived font, it\'s present. This won\'t work for monospaced fonts.\n\nHere\'s where it came from: [Javascript/CSS Font Detector (ajaxian.com; 12 Mar 2007)](http://ajaxian.com/archives/javascriptcss-font-detector)', 2, ' 5 2 6', '2019-10-24 13:48:25'),
(20, 'I wrote a simple JavaScript tool that you can use it to check if a font is installed or not.\nIt uses simple technique and should be correct most of the time.\n\n(jFont Checker)[https://github.com/derek1906/jFont-Checker/] on github', 2, ' 5', '2019-10-24 13:53:18'),
(23, 'There is a simple solution - just use `element.style.font`:\n\n```\nfunction getUserBrowsersFont() {\n    var browserHeader = document.getElementById(\'header\');\n    return browserHeader.style.font;\n}\n```\n\nThis function will exactly do what you want. On execution It will return the font type of the user/browser. Hope this will help.', 5, ' 2 5', '2019-10-24 14:11:56'),
(24, 'Your problem is referencing the same msg object from async code. The foreach completes before the sendMail would send out the emails.\n\nSo msg.to wil be the last item from the maiilist object.\n\nTry to clone/copy msg inside maillist foreach, or just move msg definition to there :\n\n```\nmaillist.forEach(function (to, i , array) {\n\n\n  var msg = {\n        from: \"******\", // sender address\n        subject: \"Hello ✔\", // Subject line\n        text: \"Hello This is an auto generated Email for testing  from node please ignore it  ✔\", // plaintext body\n        cc: \"*******\"    \n        //  html: \"<b>Hello world ✔</b>\" // html body\n    }\n  msg.to = to;\n\n  smtpTransport.sendMail(msg, function (err) {\n       console.log(err)\n  })\n```', 5, '7 6 2', '2019-10-25 06:46:23'),
(25, 'nodemailer (v2.4.2) [docs](https://github.com/nodemailer/nodemailer#e-mail-message-fields) say:\n\n> `to` - Comma separated list or an array of recipients e-mail addresses that will appear on the To: field\n\nSo you can just do:\n\n```\nvar maillist = [\n  \'****.sharma3@****.com\',\n  \'****.bussa@****.com\',\n  \'****.gawri@****.com\',\n];\n\nvar msg = {\n    from: \"******\", // sender address\n    subject: \"Hello ✔\", // Subject line\n    text: \"Hello This is an auto generated Email for testing  from node please ignore it  ✔\", // plaintext body\n    cc: \"*******\",\n    to: maillist\n}\n```', 2, ' 6', '2019-10-25 10:49:15'),
(26, 'A good way to do it asynchronously would be to use the each function in the async module: [https://caolan.github.io/async/docs.html#each](https://caolan.github.io/async/docs.html#each)\n\n```\nvar async = require(\"async\");\n\nasync.each(maillist, function(to, callback){\n\n    msg.to = to;\n\n    smtpTransport.sendMail(msg, function (err) {\n        if (err) { \n            console.log(\'Sending to \' + to + \' failed: \' + err);\n            callback(err);\n        } else { \n            console.log(\'Sent to \' + to);\n            callback();\n        }\n    });\n}, function(err){\n    if(err){\n        console.log(\"Sending to all emails failed:\" + err);\n    }\n\n    //Do other stuff or return appropriate value here\n});\n```', 6, '', '2019-10-25 11:00:58'),
(27, 'test answer', 6, '', '2019-11-07 17:41:25');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(225) NOT NULL,
  `body` text NOT NULL,
  `anonymousTags` varchar(225) DEFAULT NULL,
  `owner` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  `votes` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `body`, `anonymousTags`, `owner`, `created`, `views`, `votes`) VALUES
(3, 'Tìm hiểu về json web token (JWT) phần 1', '### JSON Web Token là gì?\n\nJSON Web Mã (JWT) là một chuẩn mở (RFC 7519) định nghĩa một cách nhỏ gọn và khép kín để truyền một cách an toàn thông tin giữa các bên dưới dạng đối tượng JSON. Thông tin này có thể được xác minh và đáng tin cậy vì nó có chứa chữ ký số. JWTs có thể được ký bằng một thuật toán bí mật (với thuật toán HMAC) hoặc một public / private key sử dụng mã hoá RSA.\n\nMột ví dụ về JWT Token:\n\n```\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEzODY4OTkxMzEsImlzcyI6ImppcmE6MTU0ODk1OTUiLCJxc2giOiI4MDYzZmY0Y2ExZTQxZGY3YmM5MGM4YWI2ZDBmNjIwN2Q0OTFjZjZkYWQ3YzY2ZWE3OTdiNDYxNGI3MTkyMmU5IiwiaWF0IjoxMzg2ODk4OTUxfQ.uKqU9dTB6gKwG6jQCuXYAiMNdfNRw98Hw_IWuA5MaMo\n```\n\nThoạt trông phức tạp là thế nhưng nếu hiểu, cấu trúc của một JWT chỉ đơn giản như sau:\n\n```\n<base64-encoded header>.<base64-encoded payload>.<base64-encoded signature>\n```\n\nNói một cách khác, JWT là sự kết hợp (bởi dấu .) một Object Header dưới định dạng JSON được encode base64, một payload object dưới định dạng JSOn được encode base64 và một Signature cho URI cũng được mã hóa base64 nốt.\n\n### Giải thích thêm về 3 thành phần của JWT\n\n#### Header\n\nHeader bao gồm hai phần chính: loại token (mặc định là JWT - Thông tin này cho biết đây là một Token JWT) và thuật toán đã dùng để mã hóa (HMAC SHA256 - HS256 hoặc RSA).\n\n```\n{\n  \"alg\": \"HS256\",\n  \"typ\": \"JWT\"\n}\n```\n\n#### Payload\n\nPayload chứa các claims. Claims là một các biểu thức về một thực thể (chẳng hạn user) và một số metadata phụ trợ. Có 3 loại claims thường gặp trong Payload: reserved, public và private claims.\n\nReserved claims: Đây là một số metadata được định nghĩa trước, trong đó một số metadata là bắt buộc, số còn lại nên tuân theo để JWT hợp lệ và đầy đủ thông tin: iss (issuer), iat (issued-at time) exp (expiration time), sub (subject), aud (audience), jti (Unique Identifier cho JWT, Can be used to prevent the JWT from being replayed. This is helpful for a one time use token.) ... Ví dụ:\n\n```\n{\n    \"iss\": \"jira:1314039\",\n    \"iat\": 1300819370,\n    \"exp\": 1300819380,\n    \"qsh\": \"8063ff4ca1e41df7bc90c8ab6d0f6207d491cf6dad7c66ea797b4614b71922e9\",\n    \"sub\": \"batman\",\n    \"context\": {\n        \"user\": {\n            \"userKey\": \"batman\",\n            \"username\": \"bwayne\",\n            \"displayName\": \"Bruce Wayne\"\n        }\n    }\n}\n```\n\n```\n{\n  \"iss\": \"scotch.io\",\n  \"exp\": 1300819380,\n  \"name\": \"Chris Sevilleja\",\n  \"admin\": true\n}\n```\n\n**Public Claims** - Claims được cộng đồng công nhận và sử dụng rộng rãi.\n\n**Private Claims** - Claims tự định nghĩa (không được trùng với Reserved Claims và Public Claims), được tạo ra để chia sẻ thông tin giữa 2 parties đã thỏa thuận và thống nhất trước đó.\n\n#### Signature\n\nChữ ký Signature trong JWT là một chuỗi được mã hóa bởi header, payload cùng với một chuỗi bí mật theo nguyên tắc sau:\n\n```\nHMACSHA256(\n  base64UrlEncode(header) + \".\" +\n  base64UrlEncode(payload),\n  secret)\n```\n\nDo bản thân Signature đã bao gồm cả header và payload nên Signature có thể dùng để kiểm tra tính toàn vẹn của dữ liệu khi truyền tải.', '[\"javascript\",\"web\",\"json-web-token\"]', 2, '2019-10-22 07:55:19', 0, NULL),
(4, 'Tìm hiểu về json web token (JWT) phần 2', '#### When should you use JSON Web Tokens?\n\nMột trong những tình huống ứng dụng JWT thường gặp, đó là:\n\nAuthentication: Tình huống thường gặp nhất, khi user logged in, mỗi request tiếp đó đều kèm theo chuỗi token JWT, cho phép người dùng có thể truy cập đường dẫn, dịch vụ và tài nguyên được phép ứng với token đó. Single Sign On cũng là một chức năng có sử dụng JWT một cách rộng rãi, bởi vì chuỗi JWT có kích thước đủ nhỏ để đính kèm trong request và sử dụng ở nhiều hệ thống thuộc các domain khác nhau.\n\nInformation Exchange: JSON Web Token cũng là một cách hữu hiệu và bảo mật để trao đổi thông tin giữa nhiều ứng dụng, bởi vì JWT phải được ký (bằng cặp public / private key), bạn có thể chắc rằng người gửi chính là người mà họ nói rằng họ là (nói tóm tắt hơn là không hoặc khó để mạo danh bằng JWT), ngoài ra, chữ ký cũng được tính toán dựa trên nội dung của header và nội dung payload, nhờ đó, bạn có thể xác thực được nội dung là nguyên bản, chưa được chỉnh sửa hoặc can thiệp. Tuy nhiên, một lưu ý hết sức quan trọng là do cấu trúc của JWT đơn giản nên JWT có thể dễ dàng bị decode, do vậy, bạn không nên dùng JWT để transfer các thông tin nhạy cảm.\n\n#### How do JSON Web Tokens work?\n\nỞ đây, mình ví dụ cụ thể ứng dụng của JWT trong bài toán Authenticate (xác thực) - Trong việc xác thực, khi user đăng nhập thành công (Browser sẽ post username và mật khẩu về Server), Server sẽ trả về một chuỗi JWT về Browser, và Token JWT này cần được lưu lại trong Browser của người dùng (thường là LocalStorage hoặc Cookies), thay vì cách truyền thống là tạo một session trên Server và trả về Cookie.\n\nBất cứ khi nào mà User muốn truy cập vào Route được bảo vệ (mà chỉ có User đã đăng nhập mới được phép), Browser sẽ gửi token JWT này trong Header Authorization, Bearer schema của request gửi đi.\n\n`Authorization: Bearer <token>`\n\nĐây là cách mà stateless (phi trạng thái) authentication làm việc, trạng thái của user không được lưu trong bộ nhớ của Server mà được đóng gói hẳn vào trong JWT. Server sẽ kiểm tra Token JWT này có hợp lệ hay không (Bởi vì JWT có tính chất self-contained, mọi thông tin cần thiết để kiểm tra JWT đều đã được chứa trong Token JWT).\n\nDo tính chất stateless nên chúng ta không còn phải lo lắng về domains nào được sử dụng cho API của bạn, như không còn gặp rắc rối với CORS (Cross-Origin Resource Sharing) vì nó không sử dụng cookies.\n\nSơ đồ dưới đây cho thấy quá trình này\n\n![anh](https://viblo.asia/uploads/bd5688e3-49bc-42cd-956c-79c96d1f5095.png)\n\nTài liệu tham khảo: (JWT Introduction)[https://jwt.io/]', '[\"javascript\",\"web\",\"json-web-token\"]', 2, '2019-10-22 08:02:37', 0, NULL);

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
  `description` varchar(225) DEFAULT NULL
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
  `owner` int(11) NOT NULL,
  `answers` varchar(225) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `views` int(11) NOT NULL DEFAULT '0',
  `votes` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `title`, `body`, `owner`, `answers`, `created`, `views`, `votes`) VALUES
(1, 'How to reponsive web with @media css- ask for syntax edited', '`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`', 2, '[16,17,18]', '2019-10-19 02:27:19', 0, NULL),
(2, '1052: Column \'id\' in field list is ambiguous', 'I have 2 tables. `tbl_names` and `tbl_section` which has both the `id` field in them. How do I go about selecting the `id` field, because I always get this error:\n\n```\n1052: Column \'id\' in field list is ambiguous\n```\n\nHere\'s my query:\n\n```\nSELECT id, name, section\n  FROM tbl_names, tbl_section \n WHERE tbl_names.id = tbl_section.id\n```\n\nI could just select all the fields and avoid the error. But that would be a waste in performance. What should I do?\n\n', 2, '[12,13,14,15]', '2019-10-19 02:41:38', 0, NULL),
(3, 'How to detect which one of the defined font was used in a web page?', 'Suppose I have the following CSS rule in my page:\n\n```\nbody {\n    font-family: Calibri, Trebuchet MS, Helvetica, sans-serif;\n}\n```\n\nHow can I detect which one of the defined fonts was used in the user\'s browser?\n\n**Edit for people wondering why I want to do this:** The font I\'m detecting contains glyph\'s that are not available in other fonts and when the user does not have the font I want to display a link asking the user to download that font so they can use my web application with the correct font.\n\nCurrently I am displaying the download font link for all users, I want to only display this for people who do not have the correct font installed.', 5, '[19,20,23]', '2019-10-24 13:46:51', 0, NULL),
(4, 'Sending email to multiple recipients via nodemailer', 'I am trying to send email to multiple recipients. For this I have created an array of recipients, but with my code I am only able to send mail to last email ID of the array three times. What\'s wrong with my code?\n\n```\nvar nodemailer = require(\"nodemailer\");\n\nvar smtpTransport = nodemailer.createTransport(\n\"SMTP\",{\n  host: \'\',\n  //  secureConnection: true,         // use SSL\n  port: 25\n});\n\nvar maillist = [\n  \'****.sharma3@****.com\',\n  \'****.bussa@****.com\',\n  \'****.gawri@****.com\',\n];\n\nvar msg = {\n    from: \"******\", // sender address\n    subject: \"Hello ✔\", // Subject line\n    text: \"Hello This is an auto generated Email for testing  from node please ignore it  ✔\", // plaintext body\n    cc: \"*******\"    \n    //  html: \"<b>Hello world ✔</b>\" // html body\n}\n\n\nmaillist.forEach(function (to, i , array) {\n  msg.to = to;\n\n  smtpTransport.sendMail(msg, function (err) {\n    if (err) { \n      console.log(\'Sending to \' + to + \' failed: \' + err);\n      return;\n    } else { \n      console.log(\'Sent to \' + to);\n    }\n\n    if (i === maillist.length - 1) { msg.transport.close(); }\n  });\n});\n```', 6, '[24,25,26]', '2019-10-25 06:44:58', 0, NULL),
(6, 'test tags tt', 'test tags tt', 2, NULL, '2019-11-07 14:07:42', 0, NULL),
(7, 'another test', 'another test', 6, NULL, '2019-11-07 17:26:34', 0, NULL),
(8, 'final-test', 'final-test', 6, '[27]', '2019-11-07 17:31:08', 0, NULL);

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

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `count`, `name`, `description`) VALUES
(1, 0, 'javascript', '*JavaScript (not to be confused with Java) is a high-level, dynamic, multi-paradigm, object-oriented, prototype-based, weakly-typed*'),
(2, 0, 'Nodejs', '*As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following \"hello world\" example, many connections can be handled concurrently. Upon each connection, the '),
(3, 0, 'Reactjs', '*React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.*'),
(4, 0, 'React Native', '*React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.*'),
(5, 0, 'Vuejs', '*An incrementally adoptable ecosystem that scales between a library and a full-featured framework.*'),
(6, 0, 'Angularjs', '*Achieve the maximum speed possible on the Web Platform today, and take it further, via Web Workers and server-side rendering.\n\nAngular puts you in control over scalability. Meet huge data requirements by building data models'),
(7, 0, 'jQuery', '*jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multit'),
(8, 0, 'HTML', '*HTML is the standard markup language for Web pages.\n\nWith HTML you can create your own Website.*'),
(9, 0, 'CSS', '*CSS is a language that describes the style of an HTML document.\n\nCSS describes how HTML elements should be displayed.*'),
(10, 0, 'SQL', '*SQL is a standard language for storing, manipulating and retrieving data in databases.*'),
(11, 0, 'Python', '*Python is a programming language.\n\nPython can be used on a server to create web applications.*'),
(12, 0, 'PHP', '*PHP is a server scripting language, and a powerful tool for making dynamic and interactive Web pages.\n\nPHP is a widely-used, free, and efficient alternative to competitors such as Microsoft\'s ASP.*s.*'),
(13, 0, 'Bootstrap', '*Bootstrap is a free CSS framework. Bootstrap 3 is the most stable version of Bootstrap, and it is still supported by the team for critical bugfixes and documentation changes.*'),
(14, 0, 'Bootstrap 3', '*Bootstrap is a free CSS framework. Bootstrap 3 is the most stable version of Bootstrap, and it is still supported by the team for critical bugfixes and documentation changes.*'),
(15, 0, 'Bootstrap 4', '*Bootstrap is a free CSS framework. Bootstrap 3 is the most stable version of Bootstrap, and it is still supported by the team for critical bugfixes and documentation changes.*'),
(16, 0, 'ASP.NET', '*.NET is a developer platform made up of tools, programming languages, and libraries for building many different types of applications.\n\nASP.NET extends the .NET developer platform with tools and libraries specifically for bu'),
(17, 0, 'C', '*C language Tutorial with programming approach for beginners and professionals, helps you to understand the C language tutorial easily. Our C tutorial explains each topic with programs.*'),
(18, 0, 'C++', '*C++ is a popular programming language.\n\nC++ is used to create computer programs.*'),
(19, 0, 'C#', '*C# is a simple, modern, general-purpose, object-oriented programming language developed by Microsoft within its .NET initiative led by Anders Hejlsberg. This tutorial will teach you basic C# programming and will also take yo'),
(20, 0, 'Matlab', '*MATLAB® combines a desktop environment tuned for iterative analysis and design processes with a programming language that expresses matrix and array mathematics directly. It includes the Live Editor for creating scripts that'),
(21, 0, 'Ubuntu', '*Operating system*'),
(22, 0, 'Window 7', '*Operating system*'),
(23, 0, 'Window 8', '*Operating system*'),
(24, 0, 'Window 10', '*Operating system*'),
(25, 0, 'MacOs', '*Operating system*'),
(26, 0, 'CentOs', '*Operating system*'),
(27, 0, 'Linux', '*Operating system*'),
(28, 0, 'Red Hat', '*Operating system*'),
(29, 0, 'SCSS', '*CSS library*'),
(30, 0, 'Less', '*Less (which stands for Leaner Style Sheets) is a backwards-compatible language extension for CSS. This is the official documentation for Less, the language and Less.js, the JavaScript tool that converts your Less styles to C'),
(31, 0, 'Java', '*Java is at the heart of our digital lifestyle. It\'s the platform for launching careers, exploring human-to-digital interfaces, architecting the world\'s best applications, and unlocking innovation everywhere—from garages to g'),
(32, 0, 'Go', '*Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.*'),
(33, 0, 'Dart', '*The following tours assume a basic familiarity with the Dart language, which you can get from skimming the language samples or the language tour. Next, learn about futures by following the asynchronous programming codelab.*'),
(34, 0, 'PhoneGap', '*Reuse existing web development skills to quickly make hybrid applications built with HTML, CSS and JavaScript. Create experiences for multiple platforms with a single codebase so you can reach your audience no matter their d'),
(35, 0, 'Flutter', '*Flutter is Google’s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.*'),
(36, 0, 'Unity', '*Start bringing your vision to life today. Unity’s real-time 3D development platform empowers you with all you need to create, operate, and monetize.*'),
(37, 0, 'doan', 'Đoàn'),
(38, 0, 'Node Mailer', 'A library of nodejs. Useful to send email by serveral methods'),
(40, 0, 'Mail', NULL),
(41, 0, 'test1', NULL),
(42, 0, 'test2', NULL),
(43, 0, 'test3', NULL),
(44, 0, 'test4', NULL),
(45, 0, 'test 1', NULL),
(46, 0, 'responsive', NULL),
(47, 0, 'sdfhsdf', NULL),
(48, 0, 'writer', NULL),
(49, 0, 'reader', NULL),
(50, 0, 'mysql', NULL),
(51, 0, 'join', NULL),
(52, 0, 'database', NULL),
(53, 0, 'mysql-1052', NULL),
(54, 0, 'fonts', NULL),
(55, 0, 'nodemailer', NULL),
(56, 0, 'another-test', NULL),
(57, 0, 'final-test', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tags_relationships`
--

CREATE TABLE `tags_relationships` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` char(20) NOT NULL,
  `tagId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags_relationships`
--

INSERT INTO `tags_relationships` (`id`, `type`, `tagId`, `typeId`) VALUES
(3, 'questions', 41, 6),
(4, 'questions', 42, 6),
(5, 'questions', 43, 6),
(6, 'questions', 44, 6),
(11, 'questions', 9, 1),
(12, 'questions', 46, 1),
(13, 'questions', 17, 1),
(14, 'questions', 50, 2),
(15, 'questions', 10, 2),
(16, 'questions', 51, 2),
(17, 'questions', 52, 2),
(18, 'questions', 53, 2),
(19, 'questions', 8, 3),
(20, 'questions', 9, 3),
(21, 'questions', 1, 3),
(22, 'questions', 54, 3),
(23, 'questions', 1, 4),
(24, 'questions', 2, 4),
(25, 'questions', 55, 4),
(26, 'questions', 56, 7),
(27, 'questions', 1, 7),
(28, 'questions', 57, 8),
(29, 'questions', 41, 8);

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
(1, 'lalatina@gmail.com', 'blue', '95d0d6ab81bde91365520a5f54f888bb5ea65ca7d1506faeb31291fc519284d1', 't630fd1d', NULL, NULL, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1573114333/ekfdicjpcwsw7aipo8cy.jpg', 1, NULL, NULL, 1, 0, NULL),
(2, 'danghuunghia2712@gmail.com', 'danghuunghia2712', '45b61a13748390082a2b1121d6db185dddd0dc36d469ac55a0ac58db8d8db531', 'tyz8ldwy', '2019-10-17 17:17:28', NULL, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1573115472/r8bdsdg0bcp01agkalqa.png', 1, '```\nconst { quotes, bio, id } = props.userPayload;\n    \nconst [fquotes, setQuotes] = useState(quotes);\nconst [showNotify, setShowNotify] = useState(\"\");\n\n```', 'Being alone is not synonymous with being lonely', 2, 0, NULL),
(5, 'lars27399@gmail.com', 'blue liars', '4be527749eb08467a825e63ff40eb622d683866d2562d29f8cb2cfc0a936af1c', 'ykxf2fkl', '2019-10-18 18:26:21', NULL, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1573114296/kiijznfoh5vexa3fwuhs.jpg', 1, NULL, NULL, 1, 0, NULL),
(6, 'nghiab1706729@student.ctu.edu.vn', 'Alagi', '31e7233a7dac17016c5dc644c6515292746ba38d7b03e70c6400e3cbac8e8e82', 'm93w1d1m', '2019-10-25 06:43:00', NULL, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1572001368/wwq264ntq828htdhkmrd.jpg', 1, NULL, NULL, 1, 0, NULL),
(7, 'mio@gmail.com', 'null', 'b6d530c16dde63f7b88a854a9b428bddb76df8624ca26ba55370f869b2f542c8', 's2p03olr', '2019-10-26 04:17:23', NULL, 'https://res.cloudinary.com/ddrw0yq95/image/upload/v1572063813/hjdzmneisg3479zosazb.png', 1, NULL, NULL, 1, 0, NULL),
(8, 'knaldt@gmail.com', NULL, 'bb171353aa868d61880e20c1a326049759107d5eed737b33c86580df75b70fb1', 'm8h1aiyv', '2019-10-26 04:19:18', NULL, 'https://res.cloudinary.com/dged6fqkf/image/upload/v1570503167/kbecwqwgxojfrwcclyym.gif', 1, NULL, NULL, 1, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`);

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
-- Indexes for table `tags_relationships`
--
ALTER TABLE `tags_relationships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_index` (`typeId`,`tagId`),
  ADD KEY `tagId` (`tagId`);

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
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `tags_relationships`
--
ALTER TABLE `tags_relationships`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`);

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`);

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
-- Constraints for table `tags_relationships`
--
ALTER TABLE `tags_relationships`
  ADD CONSTRAINT `tags_relationships_ibfk_1` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roles`) REFERENCES `privileges` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
