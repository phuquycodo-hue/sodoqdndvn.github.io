// Danh sách video ứng với 5 chuyên mục trong trang Video.
// Dán link vào youtube: "" (ưu tiên phát YouTube); file: là video MP4 dự phòng.
// Giữ nguyên dòng khởi tạo VIDEO_FILES dưới đây.
window.VIDEO_FILES = [[], [], [], [], []];

// 1. Các tổ chức tiền thân (1930–1944)
window.VIDEO_FILES[0].push({
  title: "Giai đoạn 1930–1944",
  file: "19301944.mp4",
  youtube: "https://www.youtube.com/watch?v=y3onXQ-uZc0", // Dán đường link YouTube vào đây; có link thì ưu tiên phát YouTube.
  poster: "VNTTGPQ.jpg"
});

// 2. Cách mạng tháng Tám (1944–1945)
// window.VIDEO_FILES[1].push({title:"Tên video", file:"video.mp4", poster:"anh.jpg"});
window.VIDEO_FILES[1].push({
  title: "Giai đoạn 1944-1945",
  file: "19441945.mp4",
  youtube: "", // Dán đường link YouTube vào đây; có link thì ưu tiên phát YouTube.
  poster: "vo nguyen giap.jpg"
});
// 3. Kháng chiến chống thực dân Pháp (1945–1954)
// window.VIDEO_FILES[2].push({title:"Tên video", file:"video.mp4", poster:"anh.jpg"});
window.VIDEO_FILES[2].push({
  title: "Kháng chiến chống Pháp - Phần 1",
  file: "1945-1954(1).mp4",
  youtube: "", // Dán đường link YouTube vào đây; có link thì ưu tiên phát YouTube.
  poster: "1.jpg"
});
window.VIDEO_FILES[2].push({
  title: "Kháng chiến chống Pháp - Phần 2",
  file: "1945-1954(2).mp4",
  youtube: "", // Dán đường link YouTube vào đây; có link thì ưu tiên phát YouTube.
  poster: "2.jpg"
});
// 4. Kháng chiến chống Mỹ, cứu nước (1954–1975)
// window.VIDEO_FILES[3].push({title:"Tên video", file:"video.mp4", poster:"anh.jpg"});
window.VIDEO_FILES[3].push({
  title: "Kháng chiến chống Mỹ cứu nước",
  file: "19541975.mp4",
  youtube: "", // Dán đường link YouTube vào đây; có link thì ưu tiên phát YouTube.
  poster: "17144380452724.jpeg"
});
// 5. Bảo vệ Tổ quốc và xây dựng nền quốc phòng toàn dân (1975–nay)
// window.VIDEO_FILES[4].push({title:"Tên video", file:"video.mp4", poster:"anh.jpg"});
window.VIDEO_FILES[4].push({
  title: "Bảo vệ Tổ quốc và hiện đại hóa Quân đội",
  file: "ngày nay.mp4",
  youtube: "", // Dán đường link YouTube vào đây; có link thì ưu tiên phát YouTube.
  poster: "xay-dung-nen-ngoai-giao-7195-2133.jpeg"
});