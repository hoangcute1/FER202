# FER202 - Front-End with ReactJS

Tổng hợp các bài tập thực hành môn **FER202 (Front-End Development with ReactJS)** tại Đại học FPT.

---

## Mục lục

- [AS1 - News & Quiz Website](#as1---news--quiz-website)
- [AS2 - JLPT Lesson Manager](#as2---jlpt-lesson-manager)
- [AS3 - Laptop Product Store](#as3---laptop-product-store)
- [Hướng dẫn chạy](#hướng-dẫn-chạy)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)

---

## AS1 - News & Quiz Website

Ứng dụng ReactJS hiển thị tin tức và hệ thống quiz tương tác.

### Chức năng

- **Home**: Trang chủ giới thiệu website
- **News**: Danh sách tin tức, xem chi tiết từng bài viết (`/news/:id`)
- **Quiz**: Hệ thống câu hỏi trắc nghiệm
- **About**: Giới thiệu
- **Contact**: Liên hệ

### Công nghệ

- React 19 + Vite
- React Router DOM 7
- React Bootstrap 2
- Dữ liệu tĩnh (static data trong `src/data/`)

### Cấu trúc

```
AS1/
├── src/
│   ├── App.jsx              # Routing chính
│   ├── data/
│   │   ├── newsData.js      # Dữ liệu tin tức
│   │   └── quizData.js      # Dữ liệu quiz
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Contact.jsx
│       ├── News.jsx
│       ├── NewsDetail.jsx
│       └── Quiz.jsx
└── public/images/
```

### Chạy dự án

```bash
cd AS1
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## AS2 - JLPT Lesson Manager

Ứng dụng quản lý bài học JLPT (Japanese Language Proficiency Test) với đầy đủ chức năng CRUD.

### Chức năng

- **Home**: Trang chủ
- **All Lessons**: Danh sách tất cả bài học
- **Completed Lessons**: Lọc bài học đã hoàn thành
- **Lesson Detail**: Xem chi tiết bài học (`/lessons/:id`)
- **Add Lesson**: Thêm bài học mới
- **Update Lesson**: Cập nhật bài học (`/update-lesson/:id`)

### Công nghệ

- React 19 + Create React App
- React Router DOM 7
- React Bootstrap 2
- Axios (gọi API)
- JSON Server (mock API)

### Cấu trúc

```
AS2/
├── jlpt_lessons.json        # Dữ liệu mock API
├── src/
│   ├── App.js               # Routing chính
│   ├── components/
│   │   └── NavbarComponent.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── AllLessons.js
│   │   ├── CompletedLessons.js
│   │   ├── LessonDetail.js
│   │   ├── AddLesson.js
│   │   └── UpdateLesson.js
│   └── services/
│       └── api.js           # Axios API service
└── public/
```

### Chạy dự án

```bash
cd AS2
npm install
npm start
```

Mở trình duyệt tại `http://localhost:3000`

---

## AS3 - Laptop Product Store

Ứng dụng quản lý cửa hàng laptop với MockAPI, hỗ trợ xem danh sách sản phẩm, thêm, sửa, xóa sản phẩm.

### Chức năng

- **Home** (`/`): Hiển thị danh sách sản phẩm dạng card, xem chi tiết
- **Manage Products** (`/manage`): Bảng quản lý sản phẩm (Thêm / Sửa / Xóa)
- **Product Detail** (`/products/:id`): Xem chi tiết sản phẩm
- **Product Edit** (`/products/edit/:id`): Chỉnh sửa thông tin sản phẩm
- **About** (`/about`): Giới thiệu cửa hàng
- **Contact** (`/contact`): Thông tin liên hệ & form gửi tin nhắn

### Công nghệ

- React 19 + Vite
- React Router DOM 7
- React Bootstrap 2
- Axios (gọi API)
- MockAPI (REST API online)
- Framer Motion (animation)
- React Icons

### Cấu trúc

```
AS3/
├── .env                      # VITE_API_URL (MockAPI endpoint)
├── db.json                   # Dữ liệu mẫu (tham khảo)
├── src/
│   ├── App.jsx               # Routing chính
│   ├── components/
│   │   ├── Home.jsx          # Trang chủ - danh sách card
│   │   ├── ProductList.jsx   # Quản lý sản phẩm (CRUD table)
│   │   ├── ProductDetail.jsx # Chi tiết sản phẩm
│   │   ├── ProductEdit.jsx   # Chỉnh sửa sản phẩm
│   │   ├── CustomNavbar.jsx  # Thanh điều hướng
│   │   ├── About.jsx         # Trang giới thiệu
│   │   └── Contact.jsx       # Trang liên hệ
└── public/images/            # Ảnh sản phẩm
```

### Cấu hình

Tạo file `.env` trong thư mục `AS3/`:

```
VITE_API_URL=https://69a50570885dcb6bd6a71319.mockapi.io/API/MMA
```

### Chạy dự án

```bash
cd AS3
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Công nghệ sử dụng

| Công nghệ | AS1 | AS2 | AS3 |
|---|:---:|:---:|:---:|
| React 19 | ✅ | ✅ | ✅ |
| React Router DOM 7 | ✅ | ✅ | ✅ |
| React Bootstrap | ✅ | ✅ | ✅ |
| Vite | ✅ | | ✅ |
| Create React App | | ✅ | |
| Axios | | ✅ | ✅ |
| MockAPI | | | ✅ |
| JSON Server | | ✅ | |
| Framer Motion | | | ✅ |
| React Icons | | | ✅ |

---

## Tác giả

Sinh viên Đại học FPT - Môn FER202 (Spring 2026)
