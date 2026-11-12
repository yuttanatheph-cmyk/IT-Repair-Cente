// แสดงชื่อไฟล์เมื่อมีการเลือกแนบรูป
function showFileName(input) {
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (input.files && input.files[0]) {
        fileNameDisplay.innerHTML = `<i class="fa-solid fa-file-image"></i> เลือกไฟล์: ${input.files[0].name}`;
    } else {
        fileNameDisplay.innerHTML = '';
    }
}

let tempFormData = null;

// ป๊อปอัปยืนยันก่อนส่งข้อมูล
function confirmSubmission(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const department = document.getElementById('department').value;
    const deviceType = document.getElementById('deviceType').value;
    const assetTag = document.getElementById('assetTag').value || '-';
    const issueDescription = document.getElementById('issueDescription').value;

    tempFormData = {
        id: '#REP-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleString('th-TH'),
        fullname: fullname,
        phone: phone,
        department: department,
        device: `${deviceType} (${assetTag})`,
        issue: issueDescription,
        status: 'รอดำเนินการ'
    };

    // แสดงรายละเอียดลงใน Modal ยืนยัน
    const confirmDetails = document.getElementById('confirmDetails');
    confirmDetails.innerHTML = `
        <p><strong>ผู้แจ้ง:</strong> ${fullname} (${department})</p>
        <p><strong>เบอร์ติดต่อ:</strong> ${phone}</p>
        <p><strong>อุปกรณ์:</strong> ${deviceType} [${assetTag}]</p>
        <p><strong>อาการเสีย:</strong> ${issueDescription}</p>
    `;

    document.getElementById('confirmModal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

// เมื่อกดตกลงในป๊อปอัป
function executeSubmit() {
    closeConfirmModal();

    let reports = JSON.parse(localStorage.getItem('repairReports')) || [];
    reports.unshift(tempFormData);
    localStorage.setItem('repairReports', JSON.stringify(reports));

    // แสดง Modal สำเร็จ
    document.getElementById('successModal').classList.add('active');

    setTimeout(() => {
        window.location.href = "admin.html";
    }, 1500);
}