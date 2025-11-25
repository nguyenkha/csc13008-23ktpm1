## PTUDW - Final Test #1: Online Learning WebApp

### Quy tắc nộp bài

- Tên file: **MSSV.zip** (có thể dùng định dạng file nén khác)
- Không nộp `node_modules`
- Thời gian làm bài: **90 phút**
- Thời điểm đóng link nộp bài: **5 phút** sau khi kết thúc thời gian làm bài
- Nộp bảng điểm tự đánh giá chuẩn bị vấn đáp

### Quy tắc nộp video ghi màn hình quá trình làm bài

- Sinh viên quay phim toàn bộ màn hình máy tính của mình trong suốt quá trình làm bài thi, bao gồm cả taskbar, system tray, đồng hồ hệ thống, camera cá nhân quay trọn vẹn khuôn mặt và **KHÔNG CHE** đồng hồ hệ thống.
- Sinh viên dùng **OBS Studio** kết hợp với **DroidCam** để quay phim
  - Video output: 1920 x 1080, Video Bitrate 720Kbs, FPS 30 
  - Upload lên YouTube
  - Nộp link vào **cuối ngày thi**
- Sinh viên dùng **Loom** để quay phim
  - Nộp link vào **cuối ngày thi**

### Tài nguyên được cung cấp

Sinh viên được cung cấp các tài nguyên sau để thực hiện bài thi
- `html-files`
  - `list-filter.html` -> giao diện html hiển thị danh sách các khoá học, có hỗ trợ lọc dữ liệu theo **level** và **instructor**
  - `create-course.html` -> giao diện html tạo mới 01 khoá học
  - Cả 2 giao diện đều sử dụng `tailwindcss`
- `backend-spec`
  - `api-doc.md` -> mô tả các resources được cung cấp ở backend cùng phương pháp tích hợp
  - `*.http` -> các http request mẫu, gọi backend

### Yêu cầu bài thi

#### A - Web App
Sinh viên xây dựng ứng dụng Web Client-side render có các chức năng sau:
- Hiển thị danh sách các khoá học, giao diện tham khảo được cung cấp ở file `list-filter.html` (**2.5 điểm**)
  - Hỗ trợ lọc dữ liệu theo 2 tiêu chí level và instructor (**1.0 điểm**)
  - Hiển thị loading spinner khi chờ hiển thị dữ liệu mới (**0.5 điểm**)
  - **Smart filters** được xây dựng như là một component độc lập (**1 điểm**)
- Thêm mới một khoá học, giao diện tham khảo được cung cấp ở file `create-course.html` (**3 điểm**)
  - Validate dữ liệu nhập, tùy chọn có thể dùng hook form + zod hoặc tự xử lý (**2 điểm**)

#### B - Lưu ý
- Sinh viên chủ động tạo dự án `reactjs` với các công cụ thích hợp, chuyển đổi các file `html` sang `react-functional-component` để hoàn thành bài thi
- Các công cụ khuyên dùng
  - **vite**/create-react-app
  - **tailwindcss**/flowbite
  - **react-router**
  - formik/react-hook-form
  - ...

### Thang điểm và quy định

- Giao diện khác với giao diện được cung cấp: **-2.5 điểm** / chức năng
- Không tích hợp được backend: **-3 điểm** / chức năng
- Sinh viên **KHÔNG được phép sử dụng AI** trong suốt quá trình làm bài thi, vi phạm **-80%** điểm số
  - Dùng chatgpt / claude / gemini / grok / ... để hỏi những vấn đề liên quan đến bài thi
  - Dùng Github Copilot hoặc AI Editor (như Cursor/Antigravity) tất cả các mode (agent, ask, edit, inline chat)
- Sinh viên **được phép sử dụng tính năng suggestion** (tab) của editor để làm bài
- Sinh viên **được phép sử dụng các hình ảnh khóa học/spinner, tài liệu kỹ thuật, Google để tìm kiếm thông tin đơn thuần** (với loại trừ AI)