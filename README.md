# Website lịch sử Quân đội nhân dân Việt Nam — bản nâng cấp

## Khởi chạy
Giải nén và mở `index.html` bằng Chrome hoặc Edge. Website tĩnh, đăng lên GitHub Pages được. Giữ nguyên toàn bộ cấu trúc thư mục.

## Chức năng
- **Timeline**: 5 giai đoạn có thẻ lựa chọn lớn, chỉ hiển thị sự kiện thuộc giai đoạn đang chọn.
- **Chi tiết sự kiện**: phân trang tránh trang cuối chỉ 1-2 dòng; mỗi trang có đường dẫn ảnh riêng; chỉ số chú thích bấm hoặc rê chuột để xem nội dung nguồn theo file Word.
- **Anh hùng**: hồ sơ hai thời kỳ kháng chiến; bỏ khung ảnh chiến công ở cuối.
- **Video**: mỗi giai đoạn có khu thẻ video lớn, ảnh bìa riêng, xem video trong hộp thoại lớn.
- **Kiểm tra**: 20 câu trắc nghiệm 4 đáp án, chấm điểm và hiện lời giải; tệp Windows tại `downloads/qdnd_exam.exe` có nút tải riêng.
- **Cài đặt**: 8 màu chủ đề, 4 màu nhấn, 5 font, cỡ chữ, giãn dòng, độ rộng, mật độ, căn lề, góc thẻ và giảm chuyển động. Tùy chỉnh áp dụng trên mọi trang và lưu bằng localStorage.

## Thêm ảnh theo TRANG trong Timeline
1. Chép ảnh vào `assets/events/`, ví dụ `chien-dich-trang-1.jpg` và `chien-dich-trang-2.jpg`.
2. Mở `data/periods.js`, tìm tên sự kiện, tìm mảng `images`: mỗi phần tử tương ứng một trang.
3. Điền các đường dẫn: `"images": ["assets/events/chien-dich-trang-1.jpg", "assets/events/chien-dich-trang-2.jpg"]`.
4. Không có ảnh trang nào thì để `""` ở vị trí đó. Không dùng lại ảnh trang 1 cho các trang khác.
5. Nếu bạn tự sửa số đoạn nội dung của sự kiện, số trang có thể thay đổi, cần kiểm tra lại mảng `images`.

## Chú thích nguồn
Các chú thích `[1]`, `[2]`... và `(3)`... được lấy từ tài liệu người dùng gửi và lưu trong thuộc tính `footnotes` của từng giai đoạn trong `data/periods.js`. Số chú thích in đậm, di chuột (máy tính) hoặc chạm (điện thoại) để xem nội dung. Số nguồn có thể lặp lại ở giai đoạn khác, vì đánh số được giữ theo phạm vi của tài liệu gốc.

## Thêm video và ảnh bìa
- Trong thư mục `videos/` có 5 thư mục con, mỗi thư mục có `HUONG_DAN.txt`.
- Khai báo theo mẫu trong `data/videos.js` với `title`, `file`, `poster`.
- Nên dùng MP4 chuẩn H.264 và AAC, ảnh bìa JPEG 16:9.
- GitHub web giới hạn kích thước từng tệp tải lên; video lớn nên dùng nền tảng chuyên lưu trữ video.

## Phần mềm thi Windows
Tệp `downloads/qdnd_exam.exe` là bản gốc người dùng cung cấp, KHÔNG chạy hay phân tích hành vi trong lúc làm website.
- Logo riêng: `assets/logo-phan-mem-thi.svg`.
- Liên kết từ trang Kiểm tra tải trực tiếp file.
- Kích thước: 10,990,594 bytes.
- SHA-256: `afa44e9c136142ddb01c673e063f143b995ddc95dae5d270ddb5625a89e1625f`
- Lưu ý: `.exe` chỉ chạy trên Windows và có thể bị cảnh báo bảo mật; người dùng nên quét trước khi chạy.

## Đăng lên GitHub Pages
Trong thư mục này có `index.html`. Hãy tải **NỘI DUNG** thư mục này lên thư mục gốc của repository (không tải lồng thêm một tầng). GitHub Settings → Pages → Deploy from branch → `main`, `/ (root)`.

## Font và nguồn
Giãn dòng mặc định 1.5, nội dung từ hai tài liệu Word bạn cung cấp, một số tên viết tắt được viết đầy đủ để dễ đọc. Tài liệu Word gốc không đi kèm ZIP công khai để tránh vô tình chia sẻ tệp gốc trên GitHub.
