# GUVI Developer Internship Project
## Register → Login → Profile Web Application

---

## 📁 Folder Structure

```
internship-project/
├── css/
│   └── style.css              ← All custom styles
├── js/
│   ├── register.js            ← Registration AJAX logic
│   ├── login.js               ← Login AJAX + localStorage token
│   └── profile.js             ← Profile fetch/update + logout
├── php/
│   ├── config.php             ← All DB & JWT configuration
│   ├── db_mysql.php           ← MySQL PDO connection
│   ├── db_mongo.php           ← MongoDB connection
│   ├── db_redis.php           ← Redis connection
│   ├── jwt.php                ← JWT encode/decode (no library)
│   ├── auth.php               ← Token verification middleware
│   ├── register.php           ← POST: register user (MySQL)
│   ├── login.php              ← POST: login, issue JWT, store Redis
│   ├── profile.php            ← GET/POST: profile (MongoDB)
│   └── logout.php             ← POST: delete Redis token
├── assets/                    ← Static images/icons (if any)
├── index.html                 ← Landing page
├── register.html              ← Registration page
├── login.html                 ← Login page
├── profile.html               ← Profile page (protected)
├── schema.sql                 ← MySQL schema
├── mongo_schema.js            ← MongoDB collection setup
├── composer.json              ← PHP dependencies
├── .htaccess                  ← Apache security rules
├── .gitignore
└── README.md
```

---

## ✅ Requirements Coverage

| Requirement                        | Status |
|------------------------------------|--------|
| Separate HTML / CSS / JS / PHP     | ✅      |
| No inline CSS or JS                | ✅      |
| Bootstrap 5 responsive UI          | ✅      |
| jQuery AJAX only (no form submit)  | ✅      |
| MySQL for registration/login data  | ✅      |
| MongoDB for profile data           | ✅      |
| Redis for session/token backend    | ✅      |
| No PHP Sessions                    | ✅      |
| JWT in browser localStorage        | ✅      |
| MySQL Prepared Statements only     | ✅      |
| password_hash() / password_verify()| ✅      |
| Input validation (client+server)   | ✅      |
| Error handling                     | ✅      |
| Logout removes Redis token         | ✅      |
| Security headers via .htaccess     | ✅      |

---

## 🛠 Tech Stack

- **Frontend:** HTML5, Bootstrap 5, jQuery 3.7, AJAX
- **Backend:** PHP 8+
- **Databases:** MySQL, MongoDB, Redis
- **Auth:** Custom JWT (HS256, no library)

---

## ⚙️ Setup Guide (Step by Step)

### Step 1 — Prerequisites

Make sure these are installed:

```bash
# Check PHP version (needs 8.0+)
php -v

# Check MySQL
mysql -V

# Check MongoDB
mongod --version

# Check Redis
redis-server --version

# Check Composer
composer -V

# Check PECL Redis extension
php -m | grep redis
```

If Redis extension missing:
```bash
pecl install redis
# Add to php.ini: extension=redis
```

---

### Step 2 — Clone or Download the Project

```bash
git clone https://github.com/YOUR_USERNAME/internship-project.git
cd internship-project
```

---

### Step 3 — Install PHP Dependencies (MongoDB library)

```bash
composer install
```

This installs `mongodb/mongodb` into `/vendor/`.

---

### Step 4 — Configure the Application

Open `php/config.php` and update:

```php
define('MYSQL_HOST', 'localhost');
define('MYSQL_USER', 'root');
define('MYSQL_PASS', 'YOUR_MYSQL_PASSWORD');

define('MONGO_URI',  'mongodb://localhost:27017');

define('REDIS_HOST', '127.0.0.1');
define('REDIS_PASS', '');          // If Redis has password

define('JWT_SECRET', 'CHANGE_THIS_TO_32_CHAR_RANDOM_STRING');
```

**Generate a secure JWT secret:**
```bash
php -r "echo bin2hex(random_bytes(32));"
```

---

### Step 5 — Set Up MySQL Database

```bash
mysql -u root -p < schema.sql
```

Or manually in MySQL client:
```sql
CREATE DATABASE internship_db CHARACTER SET utf8mb4;
USE internship_db;

CREATE TABLE users (
    id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_email (email)
) ENGINE=InnoDB;
```

---

### Step 6 — Set Up MongoDB Collection

```bash
mongosh < mongo_schema.js
```

Or in mongosh:
```javascript
use("internship_db");
db.createCollection("profiles");
db.profiles.createIndex({ user_id: 1 }, { unique: true });
```

---

### Step 7 — Start Redis

```bash
# Start Redis server
redis-server

# Verify it's running
redis-cli ping
# Should return: PONG
```

---

### Step 8 — Start PHP Dev Server (for local testing)

```bash
# From project root
php -S localhost:8000
```

Open: `http://localhost:8000`

---

### Step 9 — Test the Flow

1. Go to `http://localhost:8000/register.html`
2. Register with Name, Email, Password
3. You'll be redirected to `login.html`
4. Login with your credentials
5. You'll be redirected to `profile.html`
6. Fill in Age, DOB, Contact, Address, Bio
7. Click **Save Profile**
8. Click **Logout** — token is removed from Redis and localStorage

---

## 🚀 Deployment Guide (Apache + Ubuntu)

### On Ubuntu/Debian VPS:

```bash
# Install LAMP
sudo apt update
sudo apt install apache2 php8.2 php8.2-mysql php8.2-mongodb php8.2-redis libapache2-mod-php8.2 mysql-server

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl start mongod && sudo systemctl enable mongod

# Install Redis
sudo apt install redis-server
sudo systemctl enable redis-server

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Copy project
sudo cp -r internship-project/ /var/www/html/
cd /var/www/html/internship-project
composer install

# Enable mod_rewrite
sudo a2enmod rewrite headers
sudo systemctl restart apache2
```

Configure Apache VirtualHost:
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/html/internship-project

    <Directory /var/www/html/internship-project>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/internship_error.log
    CustomLog ${APACHE_LOG_DIR}/internship_access.log combined
</VirtualHost>
```

---

## 📤 GitHub Submission Guide

```bash
# Initialize git in project root
cd internship-project
git init
git add .
git commit -m "feat: complete internship project — register/login/profile"

# Create a repo on GitHub (via UI), then:
git remote add origin https://github.com/YOUR_USERNAME/internship-project.git
git branch -M main
git push -u origin main
```

---

## 🔐 Security Notes

- Passwords hashed with `bcrypt` (cost 12) via `password_hash()`
- JWTs signed with `HS256`, verified server-side on every request
- Tokens stored in Redis; deleted on logout (server-side invalidation)
- All MySQL queries use PDO prepared statements (no raw SQL)
- Input sanitized and validated both client-side and server-side
- `.htaccess` blocks direct access to config/helper PHP files
- Security headers set: `X-Frame-Options`, `X-XSS-Protection`, etc.

---

## 👤 Author

**Shristi** — GUVI Developer Internship Submission
