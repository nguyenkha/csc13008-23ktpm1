# 🎫 **TICKET MANAGEMENT SYSTEM**

## 🟡 **Yêu cầu:** 
- Đặt tên file **MSSV_XX.zip** (XX là điểm tự đánh giá), nộp theo link moodle
    - Source: Mã nguồn
    - Link.txt: Link đến video demo (bắt buộc, không có video => 0 điểm bài làm)
    - Note.txt: Các ghi chú, hướng dẫn, giải thích khác (nếu có, không bắt buộc)
- Xây dựng ứng dụng back-end (Express + Postgres) và front-end (React), kết nối thông qua REST API
- CSDL/UI phải hiển thị dữ liệu mẫu được cung cấp (hoặc nhiều hơn)
- HTML mẫu có thể không đủ các thể hiện dữ liệu, có thể tự sáng tạo cách hiển thị hợp lý
- Có thể sử dụng AI để hỏi đáp, xử lý lỗi, không phát sinh code
- ĐƯỢC sử dụng các công cụ tìm kiếm thông tin, tài liệu tham khảo, bài giảng, mã nguồn mẫu... đã được cung cấp
- ĐƯỢC sử dụng các công cụ convert HTML to JSX
- KHÔNG quay toàn bộ quá trình làm bài nhưng cần tự giác, trung thực, không trao đổi bài.

## ✅ **Video demo**

Quay phim màn hình **liên tục** (độ dài không quá 10 phút) và **trình bày ngắn** (làm được - chỉ trên màn hình kết quả và mã nguồn liên quan, không làm được - trình bày mức độ hoàn thành hoặc chưa làm), đọc điểm tự đánh giá theo từng phần:

- Yêu cầu 0: (-2.0) **Sử dụng API key** để đảm bảo chỉ request kèm API key mới truy cập được
- Yêu cầu 1: (3.0) **1 đối tượng chính**: Ticket (GET ALL/ONE/POST - 1 điểm/request), gửi request với Postman hoặc REST client khác bao gồm tất các trường hợp trả về khác nhau như đặc tả bên trên
- Yêu cầu 2: (2.0) **2 đối tượng phụ**: Customer + Category (GET ALL - 1 điểm/request), gửi request với Postman hoặc REST client khác
- Yêu cầu 3: (1.0) **Chuyển trang**: Bấm chuyển trang qua lại bằng React Router Link
- Yêu cầu 4: (1.0) **Hiển thị trang danh sách**: Tải thông tin từ back-end, lọc theo Category *hoặc/và* Customer, nếu tiêu chỉ nào không được chọn (mặc định là tất cả) thì không lọc tiêu chí đó
- Yêu cầu 5: (1.0) **Phân trang danh sách**: Hiển thị thông tin trang hiện tại, nút chọn trang bất kỳ, nút trang trước, trang sau
- Yêu cầu 6: (1.0) **Form tạo Ticket**: Nhập và validate thông tin Ticket
- Yêu cầu 7: (1.0) **Gửi Ticket thành công**: Tải thông tin lên back-end, xhuyển sang trang danh sách, chọn trang có Ticket mới tạo và mở CSDL kiểm tra dữ liệu mới
- Đọc MSSV, tổng điểm tự đánh giá, tự nhận xét và kết thúc video.

## 📋 **Mô hình dữ liệu**

### **Đối tượng chính: `Ticket` (8 trường)**

| Trường | Kiểu | Yêu cầu Validation |
| :-- | :-- | :-- |
| `id` | INT | PK, Serial, chỉ đọc |
| `title` | VARCHAR(100) | Required, 5-100 ký tự |
| `description` | TEXT | Required, 10-1000 ký tự |
| `status` | ENUM | `open`, `in_progress`, `resolved`, `closed` |
| `priority` | ENUM | `low`, `medium`, `high` |
| `customerId` | INT | FK → customers, required |
| `categoryId` | INT | FK → categories, required |
| `createdAt` | TIMESTAMP | Server auto, chỉ đọc |

### **Đối tượng phụ 1: `Customer` (GET ALL)**

| Trường | Kiểu |
| :-- | :-- |
| `id` | INT |
| `name` | VARCHAR(100) |
| `email` | VARCHAR(100) |
| `phone` | VARCHAR(20) |

### **Đối tượng phụ 2: `Category` (GET ALL)**

| Trường | Kiểu |
| :-- | :-- |
| `id` | INT |
| `name` | VARCHAR(50) |
| `description` | TEXT |

## 🔌 **REST API Specification**

### **Main Resource: `/tickets`**

#### `GET /tickets`

#### `GET /tickets?page=1`

#### `GET /tickets?page=1&categoryId=1`

#### `GET /tickets?page=1&customerId=2`

#### `GET /tickets?page=1&customerId=2&categoryId=1`

Các tham số `page` (mặc định `1`), `customerId` (mặc định không lọc), `categoryId` (mặc định không lọc) nếu xuất hiện dùng để hỗ trợ phân trang hoặc lọc dữ liệu theo các trường. Nếu có cả `customerId` và `categoryId` thì lọc theo cả 2 tiêu chí (`AND`).

```json
{
  "data": [
    {
      "id": 1,
      "title": "Cannot login with correct password",
      "description": "User enters valid credentials but gets 403 error",
      "status": "open",
      "priority": "high",
      "customerId": 2,
      "categoryId": 1,
      "createdAt": "2025-12-29T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 50
  }
}
```


#### `GET /tickets/1`

```json
{
  "data": {
    "id": 1,
    "title": "Cannot login with correct password",
    "description": "User enters valid credentials but gets 403 error",
    "status": "open",
    "priority": "high",
    "customerId": 1,
    "categoryId": 1,
    "createdAt": "2025-12-29T10:00:00.000Z"
  }
}
```


#### `POST /tickets`

**Request body**:

```json
{
  "title": "Server down",
  "description": "Production server crashed at peak hour",
  "status": "open",
  "priority": "high",
  "customerId": 3,
  "categoryId": 2
}
```

**Response 201**:

```json
{
  "data": {
    "id": 51,
    "title": "Server down",
    "description": "Production server crashed at peak hour",
    "status": "open",
    "priority": "high",
    "customerId": 3,
    "categoryId": 2,
    "createdAt": "2025-12-29T14:30:00.000Z"
  }
}
```

**Response 400** (validation error):

```json
{
  "message": "Validation error",
  "errors": [
    {"field": "title", "message": "Title must be 5-100 characters"},
    {"field": "customerId", "message": "Customer does not exist"}
  ]
}
```


### **Related Resources**

```
GET /customers
```

```json
{
  "data": [
    {"id": 1, "name": "Acme Corp Japan", "email": "support@acme.jp", "phone": "+81-90-1234-5678"},
    {"id": 2, "name": "Osaka Trading Co", "email": "info@osaka-trade.jp", "phone": "+81-80-0000-1111"}
  ]
}
```

```
GET /categories
```

```json
{
  "data": [
    {"id": 1, "name": "🔐 Login", "description": "Authentication issues"},
    {"id": 2, "name": "💳 Payment", "description": "Billing problems"}
  ]
}
```


## 🗄️ **SQL Schema + 50 Records**

```sql
-- Categories (5 records)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name, description) VALUES
('🔐 Login', 'Authentication and login issues'),
('💳 Payment', 'Billing and payment gateway problems'),
('🖥️ Server', 'Server crashes, performance issues'),
('🎨 UI/UX', 'Frontend interface and design bugs'),
('📊 Database', 'Database queries, storage issues');

-- Customers (5 records - Asia-focused for your location)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customers (name, email, phone) VALUES
('Acme Corp Japan', 'support@acme.jp', '+81-90-1234-5678'),
('Osaka Trading Co', 'info@osaka-trade.jp', '+81-80-0000-1111'),
('Tokyo Tech Solutions', 'admin@tokyotech.jp', '+81-70-1111-2222'),
('Hanoi Software JSC', 'dev@hanoisoft.vn', '+84-987-654-321'),
('Saigon Airlines IT', 'tech@saigonair.vn', '+84-28-123-4567');

-- Enums for tickets
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high');

-- Tickets (50 records: 5 samples + 45 varied for pagination 5/page x 10 pages)
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status ticket_status DEFAULT 'open',
    priority ticket_priority NOT NULL,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    category_id INTEGER NOT NULL REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tickets (title, description, status, priority, customer_id, category_id, created_at) VALUES
('Cannot login with correct password', 'User enters valid credentials but gets 403 Forbidden', 'open', 'high', 1, 1, '2025-12-29 10:00:00'),
('Stripe payment gateway timeout', 'Checkout hangs after card input, 30s timeout', 'in_progress', 'high', 2, 2, '2025-12-29 09:45:00'),
('Server 500 error /dashboard', 'Production server crashed during peak hour 8AM', 'open', 'high', 3, 3, '2025-12-29 08:30:00'),
('Mobile hamburger menu broken', 'iPhone Safari hamburger menu not responding to touch', 'resolved', 'medium', 1, 4, '2025-12-28 16:20:00'),
('Database query >10s timeout', 'SELECT * FROM orders WHERE date > NOW()-30d taking 12s', 'open', 'medium', 4, 5, '2025-12-28 14:15:00'),
('File upload size limit', 'Application consuming excessive RAM', 'open', 'high', 3, 2, '2025-12-24 04:47:00'),
('Subscription cancel fail', 'CSS animations stuttering on low-end devices', 'open', 'high', 4, 1, '2025-12-21 02:13:00'),
('Connection pool exhausted', 'Redis queries returning cache misses', 'open', 'high', 2, 5, '2025-12-27 07:28:00'),
('Docker container crash', 'All CPU cores at maximum utilization', 'open', 'low', 4, 3, '2025-12-25 04:13:00'),
('Toast notification stuck', 'Tax amounts calculated incorrectly for EU VAT', 'open', 'low', 4, 1, '2025-12-26 11:38:00'),
('Webhook timeout', 'Production server unresponsive requiring manual restart', 'closed', 'high', 1, 4, '2025-12-22 17:18:00'),
('File upload size limit', 'Database trigger not executing on INSERT', 'resolved', 'high', 2, 1, '2025-12-21 21:14:00'),
('Vacuum analyze needed', 'CSS hover states missing on interactive elements', 'open', 'low', 1, 4, '2025-12-25 14:40:00'),
('Image upload fail', 'Google OAuth flow interrupted at callback', 'resolved', 'medium', 2, 3, '2025-12-22 19:40:00'),
('OAuth Google fail', 'Custom PostgreSQL function throwing exception', 'in_progress', 'low', 4, 4, '2025-12-25 20:44:00'),
('Social login fail', 'Database connections exhausted during peak load', 'resolved', 'low', 2, 1, '2025-12-26 12:17:00'),
('Query optimization needed', 'Navigation menu fails on tablet portrait', 'resolved', 'low', 4, 4, '2025-12-28 04:16:00'),
('Dark mode glitch', 'Reset password email link expires immediately', 'resolved', 'high', 5, 4, '2025-12-27 11:14:00'),
('Dark mode glitch', 'Redis queries returning cache misses', 'closed', 'low', 1, 1, '2025-12-23 20:10:00'),
('Animation laggy', 'Reverse proxy returning gateway timeout', 'open', 'medium', 4, 5, '2025-12-28 16:16:00'),
('Social login fail', 'User cannot access account after entering credentials', 'open', 'high', 5, 3, '2025-12-26 03:18:00'),
('Nginx 502 error', 'Google OAuth flow interrupted at callback', 'closed', 'low', 3, 5, '2025-12-23 16:58:00'),
('Subscription cancel fail', 'Upload size restriction too conservative', 'resolved', 'high', 5, 5, '2025-12-24 04:23:00'),
('Toast notification stuck', 'Google OAuth flow interrupted at callback', 'open', 'high', 3, 4, '2025-12-21 03:59:00'),
('Image upload fail', 'Automated backup process terminating early', 'in_progress', 'low', 2, 5, '2025-12-22 02:46:00'),
('Refund processing delay', 'Complex query running longer than expected SLA', 'in_progress', 'low', 4, 5, '2025-12-23 08:33:00'),
('Search autocomplete slow', 'Reverse proxy returning gateway timeout', 'in_progress', 'high', 2, 3, '2025-12-27 21:41:00'),
('Image upload fail', 'Custom web fonts not loading consistently', 'closed', 'low', 2, 2, '2025-12-22 10:01:00'),
('Docker container crash', 'Facebook login returns invalid token', 'in_progress', 'high', 2, 1, '2025-12-22 22:40:00'),
('UI layout broken', 'Database connections exhausted during peak load', 'open', 'low', 3, 1, '2025-12-24 08:42:00'),
('Refund processing delay', 'Navigation menu fails on tablet portrait', 'in_progress', 'high', 5, 5, '2025-12-28 07:50:00'),
('Email verification fail', 'Card BIN validation rejecting valid numbers', 'in_progress', 'low', 1, 4, '2025-12-26 13:26:00'),
('Table join slow', 'Account overdraft protection not triggering', 'open', 'high', 1, 1, '2025-12-27 23:21:00'),
('Subscription cancel fail', 'Reset password email link expires immediately', 'in_progress', 'low', 5, 4, '2025-12-23 13:11:00'),
('CPU 100% usage', 'Multi-table JOIN query performance degradation', 'in_progress', 'low', 4, 5, '2025-12-22 01:41:00'),
('Stored procedure error', 'User cannot access account after entering credentials', 'open', 'low', 2, 4, '2025-12-28 15:13:00'),
('Captcha not loading', 'Layout shifts on mobile devices', 'in_progress', 'medium', 1, 4, '2025-12-25 14:18:00'),
('Nginx 502 error', 'Query planner not using table partitions', 'closed', 'low', 2, 3, '2025-12-24 01:37:00'),
('Kubernetes pod evicted', 'Custom PostgreSQL function throwing exception', 'open', 'high', 3, 1, '2025-12-21 18:30:00'),
('Redis cache miss', 'Modal backdrop remains after close animation', 'in_progress', 'low', 5, 1, '2025-12-23 02:38:00'),
('Query optimization needed', 'CSS animations stuttering on low-end devices', 'in_progress', 'medium', 1, 5, '2025-12-24 18:38:00'),
('Server restart needed', 'Database trigger not executing on INSERT', 'open', 'medium', 5, 5, '2025-12-26 08:13:00'),
('SSL certificate expired', 'Multi-factor setup wizard crashes on step 3', 'resolved', 'low', 3, 4, '2025-12-23 21:41:00'),
('Backup script failed', 'Multi-table JOIN query performance degradation', 'resolved', 'low', 1, 4, '2025-12-22 02:34:00'),
('Responsive menu fail', 'Redis queries returning cache misses', 'resolved', 'low', 3, 1, '2025-12-24 11:18:00'),
('OAuth Google fail', 'Custom web fonts not loading consistently', 'resolved', 'high', 5, 1, '2025-12-25 21:06:00'),
('Dark mode glitch', 'External webhook endpoint timing out consistently', 'open', 'low', 5, 2, '2025-12-25 09:38:00'),
('Responsive menu fail', 'Multi-factor setup wizard crashes on step 3', 'resolved', 'low', 3, 5, '2025-12-28 08:57:00'),
('UI layout broken', 'Cannot enable two-factor authentication', 'closed', 'medium', 1, 1, '2025-12-26 04:40:00'),
('Webhook timeout', 'Google OAuth flow interrupted at callback', 'closed', 'high', 4, 5, '2025-12-21 03:04:00');
```


## 🌐 **Frontend HTML Templates**

### **File 1: `list.html`**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎫 Ticket Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <h1 class="text-2xl font-bold text-gray-900">🎫 Ticket Management</h1>
                <div class="flex space-x-3">
                    <a href="list.html" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
                        📋 Danh sách
                    </a>
                    <a href="form.html" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm">
                        ➕ Tạo mới
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter Section -->
        <div class="bg-white shadow-sm rounded-lg p-6 border border-gray-200 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">🔍 Bộ lọc Tickets</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Khách hàng</label>
                    <select id="customerFilter" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Tất cả (5 khách hàng)</option>
                        <option value="1">Acme Corp Japan</option>
                        <option value="2">Osaka Trading Co</option>
                        <option value="3">Tokyo Tech Solutions</option>
                        <option value="4">Hanoi Software JSC</option>
                        <option value="5">Saigon Airlines IT</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                    <select id="categoryFilter" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Tất cả (5 danh mục)</option>
                        <option value="1">🔐 Login</option>
                        <option value="2">💳 Payment</option>
                        <option value="3">🖥️ Server</option>
                        <option value="4">🎨 UI/UX</option>
                        <option value="5">📊 Database</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <button id="filterBtn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                        🔍 Lọc kết quả
                    </button>
                </div>
            </div>
        </div>

        <!-- Tickets Table (5 mẫu records - Page 1/10) -->
        <div id="ticketsTable" class="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ưu tiên</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody id="ticketsBody" class="bg-white divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title="Cannot login with correct password">Cannot login with correct password</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">🔴 Open</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">🔥 High</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Acme Corp Japan</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">🔐 Login</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-12-29 10:00</td>
                        </tr>
                        <!-- 4 records mẫu khác tương tự... -->
                    </tbody>
                </table>
            </div>
            <!-- Pagination -->
            <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                <div class="text-sm text-gray-700">Hiển thị 1-5 của 50 tickets (Trang 1/10)</div>
                <div class="flex items-center space-x-2">
                    <button id="prevPage" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm opacity-50 cursor-not-allowed">← Trước</button>
                    <span class="flex space-x-1 px-3 py-2 text-sm font-medium">
                        <span class="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold">1</span>
                        <span class="text-gray-500">...</span>
                        <span class="bg-white border border-gray-300 px-2 py-2 rounded-lg">10</span>
                    </span>
                    <button id="nextPage" class="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Sau →</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```


### **File 2: `form.html`**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎫 Ticket Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <h1 class="text-2xl font-bold text-gray-900">🎫 Ticket Management</h1>
                <div class="flex space-x-3">
                    <a href="list.html" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
                        📋 Danh sách
                    </a>
                    <a href="form.html" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm">
                        ➕ Tạo mới
                    </a>
                </div>
            </div>
        </div>
    </nav>
    
    <div class="pt-20 pb-12 max-w-2xl mx-auto px-4">
        <!-- Form với validation ready -->
        <div class="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">➕ Tạo Ticket mới</h2>
            <form id="ticketForm" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tiêu đề * (5-100 ký tự)</label>
                    <input id="title" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Nhập tiêu đề ticket">
                    <p id="titleError" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả * (10-1000 ký tự)</label>
                    <textarea id="description" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Mô tả chi tiết vấn đề"></textarea>
                    <p id="descriptionError" class="mt-1 text-sm text-red-600 hidden"></p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái *</label>
                        <select id="status" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2">
                            <option value="">Chọn trạng thái</option>
                            <option value="open">🔴 Mở</option>
                            <option value="in_progress">🟡 Đang xử lý</option>
                            <option value="resolved">🟢 Đã giải quyết</option>
                            <option value="closed">⚫ Đóng</option>
                        </select>
                        <p id="statusError" class="mt-1 text-sm text-red-600 hidden"></p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ưu tiên *</label>
                        <select id="priority" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2">
                            <option value="">Chọn ưu tiên</option>
                            <option value="low">🟢 Thấp</option>
                            <option value="medium">🟡 Trung bình</option>
                            <option value="high">🔴 Cao</option>
                        </select>
                        <p id="priorityError" class="mt-1 text-sm text-red-600 hidden"></p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Khách hàng *</label>
                        <select id="customerId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2">
                            <option value="">Chọn khách hàng</option>
                            <option value="1">Acme Corp Japan</option>
                            <option value="2">Osaka Trading Co</option>
                            <option value="3">Tokyo Tech Solutions</option>
                            <option value="4">Hanoi Software JSC</option>
                            <option value="5">Saigon Airlines IT</option>
                        </select>
                        <p id="customerIdError" class="mt-1 text-sm text-red-600 hidden"></p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                        <select id="categoryId" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2">
                            <option value="">Chọn danh mục</option>
                            <option value="1">🔐 Login</option>
                            <option value="2">💳 Payment</option>
                            <option value="3">🖥️ Server</option>
                            <option value="4">🎨 UI/UX</option>
                            <option value="5">📊 Database</option>
                        </select>
                        <p id="categoryIdError" class="mt-1 text-sm text-red-600 hidden"></p>
                    </div>
                </div>
                <button type="submit" id="submitBtn" disabled class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 disabled:opacity-50">
                    ✅ Tạo Ticket mới
                </button>
            </form>
        </div>
    </div>
</body>
</html>
```
