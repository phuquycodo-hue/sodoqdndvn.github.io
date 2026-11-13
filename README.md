# Website Timeline – Lịch sử Quân đội nhân dân Việt Nam

## 1. Cách chạy trên máy tính
1. Tải và giải nén `website_timeline_qdndvn.zip`.
2. Mở thư mục vừa giải nén.
3. Nhấp đúp vào `index.html` để mở bằng Chrome, Edge hoặc Firefox.
4. Bấm **Chi tiết sự kiện** để mở trang nội dung riêng của từng sự kiện.
5. Không cần cài đặt máy chủ hay phần mềm lập trình để xem website.

Khuyến nghị: cài Visual Studio Code nếu muốn chỉnh sửa mã nguồn thuận tiện.

## 2. Cấu trúc
- `index.html`: trang tổng quan và danh sách dòng thời gian.
- `detail.html`: mẫu trang chi tiết sự kiện.
- `style.css`: màu sắc, bố cục, kiểu chữ và giao diện responsive.
- `data.js`: toàn bộ dữ liệu sự kiện; đây là tệp chính cần chỉnh sửa khi thêm nội dung.
- `script.js`: dựng timeline và điều hướng giai đoạn.
- `detail.js`: hiển thị trang chi tiết theo mã sự kiện.
- `assets/`: nơi lưu ảnh tư liệu do bạn bổ sung.

## 3. Cách thay ảnh tư liệu
1. Chép ảnh vào thư mục `assets`.
2. Mở `data.js`.
3. Tìm sự kiện muốn thêm ảnh.
4. Sửa `image:""` thành ví dụ `image:"assets/dien-bien-phu.jpg"`.
5. Sửa `imageAlt` thành mô tả ảnh.
6. Lưu tệp và tải lại trang.

Nên dùng ảnh có quyền sử dụng phù hợp, ghi nguồn và chú thích ảnh khi cần.

## 4. Cách thêm sự kiện
Trong `data.js`, sao chép một đối tượng trong mảng `EVENTS`, sau đó thay:
- `id`: mã duy nhất, không dấu, không khoảng trắng.
- `period`: một trong các mã `1944-1954`, `1954-1975`, `1975-1986`, `1986-nay`.
- `date`: ngày/tháng/năm hoặc khoảng thời gian.
- `title`: tên sự kiện.
- `tag`: nhãn ngắn.
- `summary`: đoạn giới thiệu hiển thị trên timeline.
- `content`: mảng các đoạn nội dung ở trang chi tiết.
- `image`: đường dẫn ảnh trong thư mục assets hoặc chuỗi rỗng.

## 5. Lưu ý về nội dung
Website được cung cấp kèm dữ liệu khái quát và một số mốc tiêu biểu để làm mẫu, không phải bộ tư liệu lịch sử đầy đủ hoặc ấn bản thẩm định. Trước khi sử dụng trong bài giảng, trưng bày, tuyên truyền hoặc xuất bản chính thức, hãy đối chiếu ngày tháng, địa danh, tên đơn vị và nội dung với tài liệu lịch sử, văn kiện và nguồn chính thống. Có thể bổ sung chú thích nguồn ở cuối từng sự kiện.
