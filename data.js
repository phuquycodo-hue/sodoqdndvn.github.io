// DỮ LIỆU SỰ KIỆN: chỉnh sửa hoặc bổ sung sự kiện tại đây.
// Mỗi sự kiện cần có id duy nhất, period, date, title, summary, content và image.
// Ảnh: đặt tệp trong thư mục assets/ rồi ghi đường dẫn, ví dụ "assets/dien-bien-phu.jpg".
// Nếu chưa có ảnh, để image: "" để hiện khung ảnh minh họa.

const PERIODS = [
  { id: "1944-1954", title: "1944 – 1954", label: "Thành lập và kháng chiến chống thực dân Pháp" },
  { id: "1954-1975", title: "1954 – 1975", label: "Xây dựng miền Bắc, đấu tranh giải phóng miền Nam" },
  { id: "1975-1986", title: "1975 – 1986", label: "Bảo vệ Tổ quốc và khắc phục hậu quả chiến tranh" },
  { id: "1986-nay", title: "1986 – nay", label: "Đổi mới, hội nhập và xây dựng Quân đội hiện đại" }
];

const EVENTS = [
  {
    id:"thanh-lap-doi-vietnam-tuyen-truyen-giai-phong-quan",
    period:"1944-1954", date:"22/12/1944", title:"Thành lập Đội Việt Nam Tuyên truyền Giải phóng quân",
    tag:"Mốc son thành lập", summary:"Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập tại khu rừng Trần Hưng Đạo, tỉnh Cao Bằng, gồm 34 chiến sĩ, do đồng chí Võ Nguyên Giáp tổ chức và chỉ huy.",
    content:[
      "Ngày 22/12/1944, tại khu rừng Trần Hưng Đạo (nay thuộc xã Tam Kim, tỉnh Cao Bằng), Đội Việt Nam Tuyên truyền Giải phóng quân chính thức được thành lập. Đội có 34 chiến sĩ, được tổ chức thành ba tiểu đội, do đồng chí Võ Nguyên Giáp trực tiếp tổ chức và chỉ huy.",
      "Sự ra đời của Đội đánh dấu bước phát triển quan trọng của lực lượng vũ trang cách mạng, đặt nền móng cho Quân đội nhân dân Việt Nam. Từ một đội quân nhỏ, lực lượng vũ trang cách mạng không ngừng trưởng thành, phát triển và trở thành quân đội của nhân dân, do nhân dân và vì nhân dân.",
      "Ngày 22/12 hằng năm được xác định là Ngày thành lập Quân đội nhân dân Việt Nam; đồng thời là Ngày hội Quốc phòng toàn dân."
    ],
    image:"", imageAlt:"Tư liệu về Đội Việt Nam Tuyên truyền Giải phóng quân"
  },
  {
    id:"tong-khoi-nghia-thang-tam-1945",
    period:"1944-1954", date:"Tháng 8/1945", title:"Tổng khởi nghĩa Tháng Tám thành công",
    tag:"Cách mạng Tháng Tám", summary:"Lực lượng vũ trang cách mạng phối hợp với lực lượng chính trị của quần chúng nhân dân, góp phần làm nên thắng lợi của cuộc Tổng khởi nghĩa.",
    content:[
      "Tháng Tám năm 1945, dưới sự lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh, nhân dân Việt Nam tiến hành Tổng khởi nghĩa giành chính quyền trên cả nước. Các đội vũ trang cách mạng cùng lực lượng chính trị của quần chúng giữ vai trò quan trọng trong cuộc đấu tranh.",
      "Thắng lợi của Cách mạng Tháng Tám mở ra kỷ nguyên độc lập dân tộc, tạo tiền đề chính trị và thực tiễn cho sự hình thành, phát triển của lực lượng vũ trang nhân dân trong Nhà nước Việt Nam mới."
    ],
    image:"", imageAlt:"Tư liệu Cách mạng Tháng Tám năm 1945"
  },
  {
    id:"chien-thang-dien-bien-phu",
    period:"1944-1954", date:"07/05/1954", title:"Chiến thắng Điện Biên Phủ",
    tag:"Thắng lợi quyết định", summary:"Sau 56 ngày đêm chiến đấu, quân và dân Việt Nam giành thắng lợi trong Chiến dịch Điện Biên Phủ, tạo bước ngoặt quyết định trong cuộc kháng chiến chống thực dân Pháp.",
    content:[
      "Chiến dịch Điện Biên Phủ diễn ra từ ngày 13/3 đến ngày 7/5/1954. Với tinh thần quyết chiến, quyết thắng, bộ đội chủ lực phối hợp cùng lực lượng dân công, thanh niên xung phong và nhân dân các địa phương vượt qua muôn vàn khó khăn, tiêu diệt tập đoàn cứ điểm Điện Biên Phủ.",
      "Chiến thắng là đỉnh cao của cuộc Tiến công chiến lược Đông – Xuân 1953–1954, buộc Chính phủ Pháp phải ký Hiệp định Genève về đình chỉ chiến sự ở Đông Dương. Thắng lợi này có ý nghĩa to lớn đối với phong trào giải phóng dân tộc trên thế giới."
    ],
    image:"", imageAlt:"Tư liệu Chiến thắng Điện Biên Phủ"
  },
  {
    id:"thanh-lap-quan-chung-hai-quan",
    period:"1954-1975", date:"07/05/1955", title:"Thành lập lực lượng Hải quân nhân dân Việt Nam",
    tag:"Xây dựng lực lượng", summary:"Ngày 7/5/1955, Cục Phòng thủ bờ bể được thành lập, tiền thân của Quân chủng Hải quân nhân dân Việt Nam ngày nay.",
    content:[
      "Ngày 7/5/1955, Bộ Quốc phòng quyết định thành lập Cục Phòng thủ bờ bể trực thuộc Bộ Quốc phòng. Đây là tổ chức tiền thân của Hải quân nhân dân Việt Nam, đánh dấu bước phát triển trong quá trình xây dựng lực lượng bảo vệ vùng biển, đảo của Tổ quốc.",
      "Trải qua quá trình xây dựng và trưởng thành, Hải quân nhân dân Việt Nam từng bước phát triển về tổ chức, lực lượng, phương tiện và trình độ sẵn sàng chiến đấu, góp phần bảo vệ chủ quyền biển, đảo và thềm lục địa thiêng liêng của đất nước."
    ],
    image:"", imageAlt:"Tư liệu Hải quân nhân dân Việt Nam"
  },
  {
    id:"thanh-lap-binh-chung-hoa-hoc",
    period:"1954-1975", date:"19/04/1958", title:"Ngày truyền thống Bộ đội Hóa học",
    tag:"Xây dựng binh chủng", summary:"Ngày 19/4/1958, Phòng Hóa học thuộc Cục Quân huấn được thành lập, đặt nền móng cho sự phát triển của lực lượng hóa học trong Quân đội.",
    content:[
      "Ngày 19/4/1958, Phòng Hóa học thuộc Cục Quân huấn, Tổng cục Quân huấn được thành lập. Đây là dấu mốc có ý nghĩa đối với quá trình xây dựng lực lượng chuyên môn về phòng hóa trong Quân đội nhân dân Việt Nam.",
      "Bộ đội Hóa học phát huy truyền thống 'Phòng chống tốt – chiến đấu giỏi', thực hiện nhiệm vụ bảo đảm phòng chống tác nhân hóa học, sinh học, phóng xạ, hạt nhân; khắc phục hậu quả chất độc hóa học và tham gia ứng phó sự cố môi trường."
    ],
    image:"", imageAlt:"Tư liệu Bộ đội Hóa học"
  },
  {
    id:"phong-trao-dong-khoi",
    period:"1954-1975", date:"17/01/1960", title:"Phong trào Đồng khởi",
    tag:"Đấu tranh cách mạng", summary:"Phong trào Đồng khởi bùng nổ ở nhiều địa phương miền Nam, tạo chuyển biến quan trọng trong phong trào cách mạng miền Nam.",
    content:[
      "Từ cuối năm 1959 và đầu năm 1960, phong trào nổi dậy của quần chúng diễn ra ở nhiều địa phương miền Nam. Bến Tre là một trong những địa bàn tiêu biểu, với cuộc Đồng khởi bắt đầu từ ngày 17/1/1960.",
      "Phong trào làm suy yếu hệ thống chính quyền cơ sở của đối phương ở nhiều vùng nông thôn, thúc đẩy sự phát triển của cách mạng miền Nam và góp phần hình thành thế trận chiến tranh nhân dân."
    ],
    image:"", imageAlt:"Tư liệu phong trào Đồng khởi"
  },
  {
    id:"chien-thang-ap-bac",
    period:"1954-1975", date:"02/01/1963", title:"Chiến thắng Ấp Bắc",
    tag:"Nghệ thuật quân sự", summary:"Trận Ấp Bắc ở Mỹ Tho trở thành dấu mốc quan trọng, khẳng định khả năng đánh bại các chiến thuật quân sự mới của đối phương.",
    content:[
      "Ngày 2/1/1963, lực lượng vũ trang và nhân dân tại Ấp Bắc, tỉnh Mỹ Tho (nay thuộc tỉnh Đồng Tháp) chiến đấu chống cuộc càn quét của quân đội Sài Gòn có cố vấn và phương tiện Mỹ hỗ trợ.",
      "Chiến thắng Ấp Bắc có tác động lớn về chính trị, quân sự và tư tưởng; cổ vũ phong trào đấu tranh ở miền Nam, góp phần củng cố niềm tin vào khả năng đánh bại chiến lược chiến tranh đặc biệt."
    ],
    image:"", imageAlt:"Tư liệu Chiến thắng Ấp Bắc"
  },
  {
    id:"tong-tien-cong-va-noi-day-tet-mau-than",
    period:"1954-1975", date:"Xuân 1968", title:"Tổng tiến công và nổi dậy Tết Mậu Thân",
    tag:"Bước ngoặt chiến lược", summary:"Cuộc Tổng tiến công và nổi dậy Xuân Mậu Thân 1968 diễn ra trên nhiều đô thị và địa bàn trọng yếu ở miền Nam.",
    content:[
      "Tết Mậu Thân năm 1968, quân và dân miền Nam tiến hành tổng tiến công và nổi dậy trên phạm vi rộng, tập trung vào các đô thị, thị xã và nhiều mục tiêu quân sự, chính trị quan trọng.",
      "Cuộc tiến công tạo tác động sâu sắc đến cục diện chiến tranh và chính trường Hoa Kỳ, góp phần buộc Mỹ phải xuống thang chiến tranh và bước vào đàm phán tại Paris. Đây là sự kiện có ý nghĩa lớn, đồng thời cũng để lại những tổn thất nặng nề."
    ],
    image:"", imageAlt:"Tư liệu Tổng tiến công và nổi dậy Xuân Mậu Thân 1968"
  },
  {
    id:"hiep-dinh-paris",
    period:"1954-1975", date:"27/01/1973", title:"Ký kết Hiệp định Paris",
    tag:"Mặt trận ngoại giao", summary:"Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết, tạo điều kiện quan trọng cho sự nghiệp giải phóng miền Nam.",
    content:[
      "Ngày 27/1/1973, Hiệp định Paris về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết. Hiệp định quy định Hoa Kỳ và các nước khác tôn trọng độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam.",
      "Việc ký kết Hiệp định Paris là thắng lợi quan trọng trên mặt trận ngoại giao, tạo điều kiện thuận lợi để quân và dân ta tiếp tục đấu tranh, tiến tới giải phóng hoàn toàn miền Nam, thống nhất đất nước."
    ],
    image:"", imageAlt:"Tư liệu ký kết Hiệp định Paris năm 1973"
  },
  {
    id:"chien-dich-ho-chi-minh",
    period:"1954-1975", date:"26–30/04/1975", title:"Chiến dịch Hồ Chí Minh toàn thắng",
    tag:"Đại thắng mùa Xuân 1975", summary:"Chiến dịch Hồ Chí Minh kết thúc thắng lợi ngày 30/4/1975, giải phóng miền Nam, thống nhất đất nước.",
    content:[
      "Chiến dịch Hồ Chí Minh diễn ra từ ngày 26 đến ngày 30/4/1975. Với sức mạnh tổng hợp của các quân đoàn chủ lực, lực lượng vũ trang địa phương và sự nổi dậy của quần chúng, quân và dân ta tiến vào giải phóng Sài Gòn.",
      "Trưa ngày 30/4/1975, xe tăng và bộ binh tiến vào Dinh Độc Lập; chính quyền Sài Gòn tuyên bố đầu hàng. Miền Nam hoàn toàn giải phóng, đất nước thống nhất, mở ra thời kỳ mới trong lịch sử dân tộc."
    ],
    image:"", imageAlt:"Tư liệu Chiến dịch Hồ Chí Minh năm 1975"
  },
  {
    id:"bao-ve-bien-gioi-tay-nam",
    period:"1975-1986", date:"1975–1979", title:"Bảo vệ biên giới Tây Nam",
    tag:"Nhiệm vụ bảo vệ Tổ quốc", summary:"Quân và dân Việt Nam chiến đấu bảo vệ chủ quyền, toàn vẹn lãnh thổ ở biên giới Tây Nam, đồng thời giúp nhân dân Campuchia thoát khỏi chế độ diệt chủng.",
    content:[
      "Sau năm 1975, tình hình biên giới Tây Nam diễn biến phức tạp. Quân và dân Việt Nam phải tiến hành cuộc đấu tranh bảo vệ chủ quyền, toàn vẹn lãnh thổ trước các hành động xâm phạm vũ trang.",
      "Tháng 1/1979, lực lượng cách mạng Campuchia cùng sự hỗ trợ của quân tình nguyện Việt Nam lật đổ chế độ Khmer Đỏ. Nhiệm vụ quốc tế này gắn với yêu cầu bảo vệ an ninh, chủ quyền và hòa bình ở khu vực biên giới."
    ],
    image:"", imageAlt:"Tư liệu bảo vệ biên giới Tây Nam"
  },
  {
    id:"chien-dau-bao-ve-bien-gioi-phia-bac",
    period:"1975-1986", date:"17/02/1979", title:"Chiến đấu bảo vệ biên giới phía Bắc",
    tag:"Bảo vệ chủ quyền lãnh thổ", summary:"Quân và dân Việt Nam chiến đấu bảo vệ biên giới phía Bắc, bảo vệ độc lập, chủ quyền và toàn vẹn lãnh thổ.",
    content:[
      "Ngày 17/2/1979, chiến tranh biên giới phía Bắc bùng nổ. Quân và dân các tỉnh biên giới cùng lực lượng chủ lực đã chiến đấu bảo vệ lãnh thổ, giữ vững chủ quyền quốc gia.",
      "Cuộc chiến đấu diễn ra ác liệt tại nhiều địa bàn. Những hy sinh, mất mát của quân và dân ta là một phần ký ức lịch sử về nhiệm vụ bảo vệ Tổ quốc trong thời kỳ sau chiến tranh."
    ],
    image:"", imageAlt:"Tư liệu chiến đấu bảo vệ biên giới phía Bắc"
  },
  {
    id:"chien-dau-bao-ve-truong-sa-1988",
    period:"1986-nay", date:"14/03/1988", title:"Sự kiện Gạc Ma",
    tag:"Bảo vệ chủ quyền biển đảo", summary:"Các chiến sĩ Hải quân nhân dân Việt Nam kiên cường bảo vệ chủ quyền tại khu vực đá Gạc Ma thuộc quần đảo Trường Sa.",
    content:[
      "Ngày 14/3/1988, tại khu vực Gạc Ma, Cô Lin và Len Đao thuộc quần đảo Trường Sa, cán bộ, chiến sĩ Hải quân nhân dân Việt Nam làm nhiệm vụ bảo vệ chủ quyền biển, đảo.",
      "Sự hy sinh của 64 cán bộ, chiến sĩ tại Gạc Ma trở thành dấu mốc đau thương nhưng không thể lãng quên trong lịch sử bảo vệ chủ quyền biển, đảo của Việt Nam. Tinh thần kiên cường của các anh được các thế hệ cán bộ, chiến sĩ và nhân dân trân trọng, tưởng nhớ."
    ],
    image:"", imageAlt:"Tư liệu tưởng niệm các chiến sĩ Gạc Ma"
  },
  {
    id:"cong-cuoc-doi-moi",
    period:"1986-nay", date:"12/1986", title:"Đại hội VI và đường lối đổi mới",
    tag:"Bước vào thời kỳ đổi mới", summary:"Đại hội đại biểu toàn quốc lần thứ VI của Đảng đề ra đường lối đổi mới toàn diện đất nước, mở ra giai đoạn phát triển mới.",
    content:[
      "Đại hội đại biểu toàn quốc lần thứ VI của Đảng diễn ra tháng 12/1986, đề ra đường lối đổi mới toàn diện, trước hết là đổi mới tư duy kinh tế, từng bước đổi mới tổ chức và phương thức hoạt động của hệ thống chính trị.",
      "Đối với Quân đội, thời kỳ đổi mới đặt ra yêu cầu điều chỉnh tổ chức lực lượng, nâng cao chất lượng tổng hợp, sức mạnh chiến đấu, kết hợp chặt chẽ nhiệm vụ xây dựng và bảo vệ Tổ quốc."
    ],
    image:"", imageAlt:"Tư liệu Đại hội VI của Đảng"
  },
  {
    id:"viet-nam-gia-nhap-asean",
    period:"1986-nay", date:"28/07/1995", title:"Việt Nam gia nhập ASEAN",
    tag:"Hội nhập quốc tế", summary:"Việt Nam trở thành thành viên thứ bảy của Hiệp hội các quốc gia Đông Nam Á (ASEAN), mở rộng môi trường hợp tác khu vực.",
    content:[
      "Ngày 28/7/1995, Việt Nam chính thức gia nhập ASEAN, đánh dấu bước tiến quan trọng trong tiến trình hội nhập khu vực và quốc tế.",
      "Trong lĩnh vực quốc phòng, hợp tác đa phương, đối thoại, xây dựng lòng tin và tham gia các cơ chế quốc phòng – an ninh khu vực ngày càng được mở rộng, góp phần giữ vững môi trường hòa bình, ổn định để phát triển đất nước."
    ],
    image:"", imageAlt:"Tư liệu Việt Nam gia nhập ASEAN"
  },
  {
    id:"tham-gia-gin-giu-hoa-binh-lien-hop-quoc",
    period:"1986-nay", date:"2014", title:"Triển khai lực lượng tham gia gìn giữ hòa bình Liên hợp quốc",
    tag:"Hội nhập quốc phòng", summary:"Việt Nam triển khai lực lượng tham gia hoạt động gìn giữ hòa bình Liên hợp quốc, thể hiện trách nhiệm với cộng đồng quốc tế.",
    content:[
      "Năm 2014, Việt Nam chính thức triển khai hoạt động tham gia gìn giữ hòa bình Liên hợp quốc, mở đầu bằng việc cử sĩ quan tham gia các phái bộ của Liên hợp quốc.",
      "Từ đó, lực lượng Quân đội nhân dân Việt Nam từng bước mở rộng hình thức tham gia, gồm sĩ quan cá nhân, bệnh viện dã chiến cấp 2 và đội công binh. Hoạt động này góp phần lan tỏa hình ảnh đất nước, con người và Quân đội nhân dân Việt Nam yêu chuộng hòa bình, có trách nhiệm."
    ],
    image:"", imageAlt:"Tư liệu lực lượng Việt Nam tham gia gìn giữ hòa bình Liên hợp quốc"
  },
  {
    id:"xay-dung-quan-doi-hien-dai",
    period:"1986-nay", date:"Hiện nay", title:"Xây dựng Quân đội nhân dân Việt Nam cách mạng, chính quy, tinh nhuệ, hiện đại",
    tag:"Nhiệm vụ trong thời kỳ mới", summary:"Quân đội tiếp tục được xây dựng vững mạnh về chính trị, nâng cao chất lượng tổng hợp và sức mạnh chiến đấu, đáp ứng yêu cầu bảo vệ Tổ quốc.",
    content:[
      "Trong bối cảnh tình hình thế giới, khu vực diễn biến nhanh chóng và phức tạp, nhiệm vụ xây dựng và bảo vệ Tổ quốc đặt ra yêu cầu ngày càng cao đối với Quân đội nhân dân Việt Nam.",
      "Quân đội tập trung xây dựng vững mạnh về chính trị làm cơ sở nâng cao chất lượng tổng hợp và sức mạnh chiến đấu; điều chỉnh tổ chức lực lượng theo hướng tinh, gọn, mạnh; đẩy mạnh nghiên cứu, ứng dụng khoa học – công nghệ và hiện đại hóa một số quân chủng, binh chủng.",
      "Đồng thời, Quân đội tích cực tham gia phòng, chống thiên tai, cứu hộ cứu nạn, phát triển kinh tế – xã hội, đối ngoại quốc phòng và hoạt động gìn giữ hòa bình Liên hợp quốc."
    ],
    image:"", imageAlt:"Tư liệu Quân đội nhân dân Việt Nam hiện nay"
  }
];