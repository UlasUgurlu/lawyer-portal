import { PrismaClient, UserRole, CaseType, CaseStatus, Visibility, TaskStatus, TaskPriority, InvoiceStatus, EventType } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a sample firm
  const firm = await prisma.firm.create({
    data: {
      name: 'Ömer & Ortakları Hukuk Bürosu',
      vatNo: '1234567890',
      address: 'Atatürk Cad. No: 123 Kat: 5 Çankaya/Ankara',
      settings: {
        theme: {
          primaryColor: '#007bff',
          logo: '/images/firm-logo.png'
        },
        emailTemplates: {
          welcome: 'Hoş geldiniz!',
          passwordReset: 'Parola sıfırlama'
        }
      }
    }
  });

  // Create users with different roles
  const firmAdmin = await prisma.user.create({
    data: {
      email: 'admin@omerhukuk.com',
      passwordHash: await hashPassword('admin123'),
      name: 'Ömer Yıldız',
      phone: '+90 532 123 4567',
      locale: 'tr',
      tz: 'Europe/Istanbul',
      emailVerified: new Date(),
    }
  });

  const lawyer1 = await prisma.user.create({
    data: {
      email: 'avukat1@omerhukuk.com',
      passwordHash: await hashPassword('lawyer123'),
      name: 'Ayşe Kaya',
      phone: '+90 532 234 5678',
      locale: 'tr',
      tz: 'Europe/Istanbul',
      emailVerified: new Date(),
    }
  });

  const lawyer2 = await prisma.user.create({
    data: {
      email: 'avukat2@omerhukuk.com',
      passwordHash: await hashPassword('lawyer123'),
      name: 'Mehmet Demir',
      phone: '+90 532 345 6789',
      locale: 'tr',
      tz: 'Europe/Istanbul',
      emailVerified: new Date(),
    }
  });

  const paralegal = await prisma.user.create({
    data: {
      email: 'paralegal@omerhukuk.com',
      passwordHash: await hashPassword('paralegal123'),
      name: 'Fatma Özkan',
      phone: '+90 532 456 7890',
      locale: 'tr',
      tz: 'Europe/Istanbul',
      emailVerified: new Date(),
    }
  });

  // Create clients
  const client1User = await prisma.user.create({
    data: {
      email: 'muvekkil1@example.com',
      passwordHash: await hashPassword('client123'),
      name: 'Ali Veli',
      phone: '+90 532 567 8901',
      locale: 'tr',
      tz: 'Europe/Istanbul',
      emailVerified: new Date(),
    }
  });

  const client2User = await prisma.user.create({
    data: {
      email: 'muvekkil2@example.com',
      passwordHash: await hashPassword('client123'),
      name: 'Zeynep Çelik',
      phone: '+90 532 678 9012',
      locale: 'tr',
      tz: 'Europe/Istanbul',
      emailVerified: new Date(),
    }
  });

  // Create memberships (user-firm relationships)
  const adminMembership = await prisma.membership.create({
    data: {
      userId: firmAdmin.id,
      firmId: firm.id,
      role: UserRole.FIRM_ADMIN
    }
  });

  const lawyer1Membership = await prisma.membership.create({
    data: {
      userId: lawyer1.id,
      firmId: firm.id,
      role: UserRole.LAWYER
    }
  });

  const lawyer2Membership = await prisma.membership.create({
    data: {
      userId: lawyer2.id,
      firmId: firm.id,
      role: UserRole.LAWYER
    }
  });

  const paralegalMembership = await prisma.membership.create({
    data: {
      userId: paralegal.id,
      firmId: firm.id,
      role: UserRole.PARALEGAL
    }
  });

  // Create client profiles
  const client1 = await prisma.client.create({
    data: {
      firmId: firm.id,
      userId: client1User.id,
      name: 'Ali Veli',
      email: 'muvekkil1@example.com',
      phone: '+90 532 567 8901',
      nationalId: '12345678901',
      contactInfo: {
        address: 'Kızılay Mah. Atatürk Bulvarı No: 45 Çankaya/Ankara',
        emergencyContact: 'Ayşe Veli - +90 532 111 2233'
      }
    }
  });

  const client2 = await prisma.client.create({
    data: {
      firmId: firm.id,
      userId: client2User.id,
      name: 'Zeynep Çelik',
      email: 'muvekkil2@example.com',
      phone: '+90 532 678 9012',
      nationalId: '12345678902',
      contactInfo: {
        address: 'Bahçelievler Mah. 7. Cadde No: 23 Çankaya/Ankara',
        emergencyContact: 'Ahmet Çelik - +90 532 444 5566'
      }
    }
  });

  // Create sample cases
  const case1 = await prisma.case.create({
    data: {
      firmId: firm.id,
      title: 'İş Sözleşmesi Feshi Davası',
      type: CaseType.DAVA,
      status: CaseStatus.ACTIVE,
      court: 'Ankara 22. İş Mahkemesi',
      registryNo: '2025/123',
      description: 'Haksız fesih nedeniyle açılan tazminat davası'
    }
  });

  const case2 = await prisma.case.create({
    data: {
      firmId: firm.id,
      title: 'Kredi Kartı Borcu İcra Takibi',
      type: CaseType.ICRA,
      status: CaseStatus.ACTIVE,
      court: 'Ankara 5. İcra Müdürlüğü',
      registryNo: '2025/456',
      description: 'Kredi kartı borcundan kaynaklanan icra takibi'
    }
  });

  const case3 = await prisma.case.create({
    data: {
      firmId: firm.id,
      title: 'Şirket Kuruluş Danışmanlığı',
      type: CaseType.DANISMANLIK,
      status: CaseStatus.ACTIVE,
      description: 'Limited şirket kuruluş sürecinde hukuki danışmanlık'
    }
  });

  // Create case participants
  await prisma.caseParticipant.create({
    data: {
      caseId: case1.id,
      clientId: client1.id,
      role: 'MUVEKKIL'
    }
  });

  await prisma.caseParticipant.create({
    data: {
      caseId: case2.id,
      clientId: client2.id,
      role: 'MUVEKKIL'
    }
  });

  await prisma.caseParticipant.create({
    data: {
      caseId: case3.id,
      clientId: client1.id,
      role: 'MUVEKKIL'
    }
  });

  // Create case assignments
  await prisma.caseAssignment.create({
    data: {
      caseId: case1.id,
      membershipId: lawyer1Membership.id,
      role: 'SORUMLU_AVUKAT'
    }
  });

  await prisma.caseAssignment.create({
    data: {
      caseId: case2.id,
      membershipId: lawyer2Membership.id,
      role: 'SORUMLU_AVUKAT'
    }
  });

  await prisma.caseAssignment.create({
    data: {
      caseId: case3.id,
      membershipId: lawyer1Membership.id,
      role: 'SORUMLU_AVUKAT'
    }
  });

  await prisma.caseAssignment.create({
    data: {
      caseId: case1.id,
      membershipId: paralegalMembership.id,
      role: 'EKIP'
    }
  });

  // Create sample documents
  const doc1 = await prisma.document.create({
    data: {
      caseId: case1.id,
      title: 'İş Sözleşmesi',
      tags: ['sözleşme', 'iş'],
      visibility: Visibility.CLIENT,
      createdBy: lawyer1.id
    }
  });

  const doc2 = await prisma.document.create({
    data: {
      caseId: case1.id,
      title: 'Tazminat Hesap Raporu',
      tags: ['tazminat', 'hesap'],
      visibility: Visibility.INTERNAL,
      createdBy: lawyer1.id
    }
  });

  // Create document versions
  await prisma.documentVersion.create({
    data: {
      documentId: doc1.id,
      storageKey: 'documents/case1/is-sozlesmesi-v1.pdf',
      filename: 'is-sozlesmesi.pdf',
      mime: 'application/pdf',
      size: 1024000,
      checksum: 'sha256:abcd1234...',
    }
  });

  await prisma.documentVersion.create({
    data: {
      documentId: doc2.id,
      storageKey: 'documents/case1/tazminat-raporu-v1.pdf',
      filename: 'tazminat-raporu.pdf',
      mime: 'application/pdf',
      size: 512000,
      checksum: 'sha256:efgh5678...',
    }
  });

  // Create sample tasks
  await prisma.task.create({
    data: {
      caseId: case1.id,
      title: 'Tanık ifadesi al',
      description: 'İşyeri çalışanlarından tanık ifadesi alınacak',
      priority: TaskPriority.HIGH,
      status: TaskStatus.TODO,
      dueAt: new Date('2025-09-15'),
      assigneeId: paralegal.id,
      creatorId: lawyer1.id
    }
  });

  await prisma.task.create({
    data: {
      caseId: case2.id,
      title: 'İtiraz dilekçesi hazırla',
      description: 'İcra takibine karşı itiraz dilekçesi hazırlanacak',
      priority: TaskPriority.URGENT,
      status: TaskStatus.IN_PROGRESS,
      dueAt: new Date('2025-09-01'),
      assigneeId: lawyer2.id,
      creatorId: lawyer2.id
    }
  });

  // Create sample events (hearings)
  await prisma.event.create({
    data: {
      caseId: case1.id,
      title: 'İlk Duruşma',
      kind: EventType.DURUSMA,
      description: 'Davanın ilk duruşması',
      location: 'Ankara Adliyesi Kat: 3 Salon: 22',
      visibility: Visibility.CLIENT,
      startsAt: new Date('2025-10-15T09:30:00'),
      endsAt: new Date('2025-10-15T12:00:00')
    }
  });

  await prisma.event.create({
    data: {
      caseId: case3.id,
      title: 'Müvekkil Toplantısı',
      kind: EventType.TOPLANTI,
      description: 'Şirket kuruluş belgelerinin imzalanması',
      location: 'Hukuk Bürosu Toplantı Salonu',
      visibility: Visibility.CLIENT,
      startsAt: new Date('2025-09-20T14:00:00'),
      endsAt: new Date('2025-09-20T15:30:00')
    }
  });

  // Create sample invoices
  const invoice1 = await prisma.invoice.create({
    data: {
      firmId: firm.id,
      caseId: case1.id,
      clientId: client1.id,
      code: 'INV-2025-001',
      currency: 'TRY',
      total: 15000.00,
      status: InvoiceStatus.SENT,
      items: [
        {
          description: 'Hukuki Danışmanlık (20 saat)',
          quantity: 20,
          unitPrice: 500,
          total: 10000
        },
        {
          description: 'Dava Dosyası Hazırlama',
          quantity: 1,
          unitPrice: 5000,
          total: 5000
        }
      ],
      issuedAt: new Date('2025-08-01'),
      dueAt: new Date('2025-09-01')
    }
  });

  await prisma.invoice.create({
    data: {
      firmId: firm.id,
      caseId: case2.id,
      clientId: client2.id,
      code: 'INV-2025-002',
      currency: 'TRY',
      total: 8000.00,
      status: InvoiceStatus.PAID,
      items: [
        {
          description: 'İcra Takibi İşlemleri',
          quantity: 1,
          unitPrice: 8000,
          total: 8000
        }
      ],
      issuedAt: new Date('2025-08-15'),
      dueAt: new Date('2025-09-15')
    }
  });

  // Create message threads and messages
  const thread1 = await prisma.messageThread.create({
    data: {
      caseId: case1.id,
      subject: 'Duruşma Hazırlığı',
      visibility: Visibility.CLIENT,
      createdBy: lawyer1.id
    }
  });

  await prisma.message.create({
    data: {
      threadId: thread1.id,
      authorId: lawyer1.id,
      body: 'Sayın müvekkilim, 15 Ekim tarihindeki duruşma için gerekli belgeler hazırlandı. Duruşma günü saat 09:00\'da adliyede buluşalım.',
      readBy: [lawyer1.id]
    }
  });

  await prisma.message.create({
    data: {
      threadId: thread1.id,
      authorId: client1User.id,
      body: 'Teşekkür ederim. O gün kesinlikle orada olacağım. Yanımda götürmem gereken başka bir belge var mı?',
      readBy: [client1User.id]
    }
  });

  // Create some notifications
  await prisma.notification.create({
    data: {
      userId: client1User.id,
      channel: 'EMAIL',
      template: 'NEW_DOCUMENT',
      payload: {
        caseName: 'İş Sözleşmesi Feshi Davası',
        documentName: 'İş Sözleşmesi',
        uploaderName: 'Ayşe Kaya'
      }
    }
  });

  await prisma.notification.create({
    data: {
      userId: client2User.id,
      channel: 'EMAIL',
      template: 'HEARING_REMINDER',
      payload: {
        caseName: 'Kredi Kartı Borcu İcra Takibi',
        hearingDate: '2025-10-15',
        hearingTime: '09:30'
      }
    }
  });

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      actorId: lawyer1.id,
      action: 'CASE_CREATE',
      entity: 'Case',
      entityId: case1.id,
      details: { caseTitle: 'İş Sözleşmesi Feshi Davası' },
      ip: '192.168.1.1',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  await prisma.auditLog.create({
    data: {
      actorId: client1User.id,
      action: 'DOCUMENT_DOWNLOAD',
      entity: 'Document',
      entityId: doc1.id,
      details: { documentTitle: 'İş Sözleşmesi' },
      ip: '192.168.1.100',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n📊 Created:');
  console.log(`   🏢 1 firm: ${firm.name}`);
  console.log(`   👥 6 users (1 admin, 2 lawyers, 1 paralegal, 2 clients)`);
  console.log(`   📁 3 cases`);
  console.log(`   📄 2 documents`);
  console.log(`   ✅ 2 tasks`);
  console.log(`   📅 2 events`);
  console.log(`   💰 2 invoices`);
  console.log(`   💬 1 message thread with 2 messages`);
  console.log('\n🔑 Login credentials:');
  console.log('   Admin: admin@omerhukuk.com / admin123');
  console.log('   Lawyer 1: avukat1@omerhukuk.com / lawyer123');
  console.log('   Lawyer 2: avukat2@omerhukuk.com / lawyer123');
  console.log('   Paralegal: paralegal@omerhukuk.com / paralegal123');
  console.log('   Client 1: muvekkil1@example.com / client123');
  console.log('   Client 2: muvekkil2@example.com / client123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
