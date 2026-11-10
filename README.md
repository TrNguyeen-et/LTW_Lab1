# BÁO CÁO ĐỀ TÀI: XÂY DỰNG WEBSITE DẠNG BLOG (DEVBLOG)
> **Môn học:** Lập trình Web (LTW - 2026)  
> **Quy mô nhóm:** 2 - 3 sinh viên  
> **Kiến trúc:** Frontend Single Page Application (ReactJS 18 + Vite 6 + React Router v6)

---

## 🧭 CÁC LUỒNG NGHIỆP VỤ CỐT LÕI (CORE BUSINESS FLOWS)

Dự án được xây dựng và kết nối chuẩn hóa theo đúng các luồng nghiệp vụ thực tế của một nền tảng Blog:

```
[Khách truy cập] ───────────────► Đọc bài viết ───────────────► Đăng ký/Đăng nhập
       │                                                               │
       ▼                                                               ▼
[Tìm kiếm & Lọc] ◄────────────── Phân trang & Sắp xếp          Bình luận & Cập nhật Profile
       │                                                               │
       ▼                                                               ▼
[Quản trị viên]  ───────────────► Bảng Quản trị (Admin) ───────► Quản lý Bài viết / Danh mục / Tài khoản
```

---

### 1. Luồng Người Dùng Đăng Ký, Đăng Nhập & Quản Lý Phiên (Auth Flow)
- **Đăng ký tài khoản (`/register`):**
  - Người dùng nhập Họ tên, Email, Năm sinh, Số điện thoại, Địa chỉ và Mật khẩu.
  - Hệ thống kiểm tra trùng email, xác nhận mật khẩu khớp $\rightarrow$ Tự động lưu vào hệ thống (`localStorage`) và đăng nhập.
- **Đăng nhập (`/login`):**
  - Nhập Email & Mật khẩu.
  - **Phân luồng quyền hạn:**
    - Nếu là **Admin** (`role: 'admin'`) $\rightarrow$ Tự động chuyển hướng vào **Bảng Quản trị (`/admin`)**.
    - Nếu là **User thường** $\rightarrow$ Chuyển hướng vào trang **Quản lý tài khoản (`/profile`)** hoặc danh sách bài viết.
  - Thanh Header tự động cập nhật Avatar, Tên người dùng và nút Đăng xuất.

---

### 2. Luồng Khám Phá, Tìm Kiếm, Lọc & Phân Trang Bài Viết (Browsing Flow)
- **Truy cập Trang chủ (`/`) hoặc Tất cả bài viết (`/blogs`):**
  - **Lọc theo danh mục (Filter):** Nhấp chọn *Frontend, Backend, AI & Data, DevOps, Career* $\rightarrow$ Danh sách lập tức lọc theo chuyên đề và URL cập nhật query `?category=...`.
  - **Tìm kiếm đa năng (Search):** Thanh tìm kiếm tra cứu đồng thời cả **Tiêu đề** và **Nội dung/Tóm tắt** bài viết.
  - **Sắp xếp linh hoạt (Sorting):** Cho phép sắp xếp theo *Mới nhất, Cũ nhất, Lượt xem nhiều nhất, Yêu thích nhất*.
  - **Phân trang chuẩn mực (Pagination):** Giới hạn số bài hiển thị trên mỗi trang, hỗ trợ nút *Trang trước*, các số trang *1, 2, ...* và *Trang sau*.

---

### 3. Luồng Đọc Bài Viết & Bình Luận Tương Tác (Reading & Comment Flow)
- **Truy cập chi tiết bài viết (`/blog/:id`):**
  - Hiển thị bài viết, ảnh bìa, tác giả, ngày xuất bản và lượt xem.
  - **Kiểm tra quyền bình luận:**
    - Nếu **chưa đăng nhập**: Hiển thị thông báo yêu cầu đăng nhập kèm nút dẫn đến `/login`.
    - Nếu **đã đăng nhập**: Hiển thị form bình luận với tên và avatar của người dùng hiện tại.
  - Sau khi nhấn **"Gửi bình luận"**, bình luận mới xuất hiện ngay lập tức trong danh sách bình luận phía dưới.
  - Người dùng có thể xóa bình luận của chính mình, và Admin có quyền kiểm duyệt/xóa bất kỳ bình luận nào.

---

### 4. Luồng Quản Lý Thông Tin Cá Nhân & Đổi Mật Khẩu (Profile Flow)
- **Truy cập trang cá nhân (`/profile`):**
  - **Xem và cập nhật thông tin liên hệ:** Chỉnh sửa Họ tên, Năm sinh, Số điện thoại, Địa chỉ liên hệ $\rightarrow$ Nhấn **"Lưu thay đổi thông tin"** để đồng bộ.
  - **Đổi mật khẩu tài khoản:** Nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới $\rightarrow$ Hệ thống kiểm tra tính hợp lệ và cập nhật bảo mật.

---

### 5. Luồng Dành Cho Quản Trị Viên (Admin Management Flow)
Truy cập tại **`/admin`** (yêu cầu tài khoản có quyền `role: 'admin'`). Hệ thống cung cấp đầy đủ 3 phân hệ quản trị CRUD:

#### a. Quản lý danh sách bài viết:
- Hiển thị danh sách bài viết dạng bảng có **tìm kiếm, lọc danh mục, sắp xếp và phân trang**.
- **Thêm bài viết mới:** Mở Modal Form nhập Tiêu đề, Danh mục, Tóm tắt, Nội dung, Ảnh bìa $\rightarrow$ Lưu và bài viết xuất hiện ngay trên trang người dùng.
- **Chỉnh sửa bài viết:** Mở Modal sửa toàn bộ nội dung của bài viết đã có.
- **Ẩn / Hiện bài viết:** Chuyển đổi trạng thái giữa `published` (Đang hiển thị) và `hidden` (Đang ẩn). Khi ẩn, người dùng thường sẽ không thấy bài viết trên trang chủ hay trang `/blogs`.
- **Xóa bài viết:** Xóa vĩnh viễn bài viết khỏi hệ thống kèm hộp thoại xác nhận.

#### b. Quản lý danh mục bài viết:
- Thêm mới danh mục (nhập Tên danh mục và Biểu tượng icon).
- Chỉnh sửa tên danh mục trực tiếp.
- Xóa danh mục không còn sử dụng.

#### c. Quản lý tài khoản (Người dùng & Quản trị viên):
- Hiển thị danh sách toàn bộ tài khoản với tìm kiếm và lọc theo vai trò (Admin / User).
- **Thêm mới tài khoản:** Tạo tài khoản Quản trị viên mới hoặc Người dùng mới.
- **Sửa thông tin tài khoản:** Cập nhật họ tên, vai trò (phân quyền Admin/User), số điện thoại, địa chỉ và mật khẩu.
- **Xóa tài khoản:** Xóa tài khoản vi phạm (hệ thống có cơ chế bảo vệ ngăn Admin tự xóa chính mình).

---

## 🛠️ HƯỚNG DẪN KIỂM THỬ TRỰC TIẾP

1. **Chạy server máy cục bộ:**
   ```bash
   npm run dev
   ```
2. **Truy cập web:** [http://localhost:3000](http://localhost:3000)
3. **Đổi tài khoản nhanh:** Nhấp vào Avatar góc trên cùng bên phải thanh Header để chuyển đổi tức thì giữa:
   - `🛡️ Admin` (`admin@devblog.com`)
   - `👤 User` (`hoang.dev@example.com`)
4. **Chuyển đổi ngôn ngữ:** Bấm nút **`[ 🇻🇳 VI | 🇬🇧 EN ]`** để kiểm tra tính năng đa ngôn ngữ toàn trang web.

---

## 🔗 LINK REPOSITORY NỘP BÀI TẬP:
👉 **[https://github.com/TrNguyeen-et/LTW_Lab1](https://github.com/TrNguyeen-et/LTW_Lab1)**
