export function getOnboardingEmailHtml(studentName: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to the Mission</title>
      <style>
        body {
          background-color: #050505;
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(90deg, #1a1a1a 0%, #050505 100%);
          padding: 40px;
          text-align: center;
          border-bottom: 2px solid #bfff00;
        }
        .logo {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: #bfff00;
          text-transform: uppercase;
        }
        .content {
          padding: 40px;
        }
        h1 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 20px;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #a0a0a0;
          margin-bottom: 24px;
        }
        .cta-button {
          display: inline-block;
          background-color: #bfff00;
          color: #000000;
          padding: 16px 32px;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 4px;
          margin-top: 20px;
        }
        .footer {
          padding: 30px;
          text-align: center;
          font-size: 12px;
          color: #444444;
          background-color: #050505;
          border-top: 1px solid #1a1a1a;
        }
        .accent {
          color: #bfff00;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Cyber4Every1</div>
        </div>
        <div class="content">
          <p class="accent">// INITIALIZING_STUDENT_DATA</p>
          <h1>Welcome, Agent ${studentName}</h1>
          <p>You have successfully enrolled in the <strong>Cyber4Every1 Bootcamp</strong>. Your journey into the heart of digital defense and technological mastery begins now.</p>
          <p>Our systems have prepared your initial training modules. Access your dashboard below to begin your first mission.</p>
          <a href="https://cyber4every1.com/dashboard" class="cta-button">Access Dashboard</a>
          <p style="margin-top: 40px; font-size: 14px;">If you have any questions, contact our support terminal at <span class="accent">info@cyber4every1.com</span></p>
        </div>
        <div class="footer">
          &copy; 2026 CYBER4EVERY1 // PROTECTING THE FUTURE // SECURE_COMM_ENCRYPTED
        </div>
      </div>
    </body>
    </html>
  `;
}
