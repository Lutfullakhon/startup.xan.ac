import type { LocalizationResource } from '@clerk/types'

const commonTexts = {
	signIn: {
		phoneCode: {
			title: 'Telefoningizni tekshiring',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			formTitle: 'Tekshiruv kodi',
			formSubtitle: 'Telefoningizga yuborilgan tekshiruv kodi ni kiriting',
			resendButton: 'Kodni qayta yuborish',
		},
	},
} as const

export const uzUZ: LocalizationResource = {
	locale: 'ru-RU',
	socialButtonsBlockButton: '{{provider|titleize}} orqali davom etish',
	dividerText: 'yoki',
	formFieldLabel__emailAddress: 'Pochta',
	formFieldLabel__emailAddresses: 'Pochta manzillari',
	formFieldLabel__phoneNumber: 'Telefon raqami',
	formFieldLabel__username: 'Foydalanuvchi nomi',
	formFieldLabel__emailAddress_username: 'Pochta yoki foydalanuvchi nomi',
	formFieldLabel__password: 'Parol',
	formFieldLabel__currentPassword: 'Hozirgi parol',
	formFieldLabel__newPassword: 'Yangi parol',
	formFieldLabel__confirmPassword: 'Parolni tasdiqlang',
	formFieldLabel__signOutOfOtherSessions: 'Boshqa qurilmalardan chiqish',
	formFieldLabel__firstName: 'Ism',
	formFieldLabel__lastName: 'Familiya',
	formFieldLabel__backupCode: 'Qayta tiklash kodi',
	formFieldLabel__organizationName: 'Tashkilot nomi',
	formFieldLabel__role: 'Rol',
	formFieldInputPlaceholder__emailAddress: '',
	formFieldInputPlaceholder__emailAddresses:
		"Bitta yoki bir nechta pochta manzillarini probel yoki vergul bilan kiriting yoki qo'shing",
	formFieldInputPlaceholder__phoneNumber: '',
	formFieldInputPlaceholder__username: '',
	formFieldInputPlaceholder__emailAddress_username: '',
	formFieldInputPlaceholder__password: '',
	formFieldInputPlaceholder__firstName: '',
	formFieldInputPlaceholder__lastName: '',
	formFieldInputPlaceholder__backupCode: '',
	formFieldInputPlaceholder__organizationName: '',
	formFieldError__notMatchingPasswords: 'Parollar mos kelmadi.',
	formFieldError__matchingPasswords: 'Parollar mos keladi.',
	formFieldAction__forgotPassword: 'Parolingizni unutdingizmi?',
	formFieldHintText__optional: '',
	formButtonPrimary: 'Davom etish',
	signInEnterPasswordTitle: 'Parolni kiriting',
	backButton: 'Orqaga',
	footerActionLink__useAnotherMethod: 'Boshqa usulni ishlatish',
	badge__primary: 'Asosiy',
	badge__thisDevice: 'Bu qurilma',
	badge__userDevice: 'Foydalanuvchi qurilmasi',
	badge__otherImpersonatorDevice: 'Boshqa qurilma',
	badge__default: 'Standart',
	badge__unverified: 'Tekshirilmagan',
	badge__requiresAction: 'Amalga oshirilishi zarur',
	badge__you: 'Siz',
	footerPageLink__help: 'Yordam',
	footerPageLink__privacy: 'Maxfiylik',
	footerPageLink__terms: 'Shartlar',
	paginationButton__previous: 'Oldinga',
	paginationButton__next: 'Keyingi',
	paginationRowText__displaying: "Ko'rsatilmoqda",
	paginationRowText__of: 'dan',
	membershipRole__admin: 'Administrator',
	membershipRole__basicMember: "A'zo",
	membershipRole__guestMember: 'Mehmon',
	signUp: {
		start: {
			title: 'Hisob yarating',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			actionText: 'Aldan akkauntmiz bormi?',
			actionLink: 'Kirish',
		},
		emailLink: {
			title: 'Pochtangizni tasdiqlang',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			formTitle: 'Tasdiqlash havolasi',
			formSubtitle: 'Pochtaga yuborilgan tasdiqlash havolasini ishlating',
			resendButton: 'Havolani qayta yuborish',
			verified: {
				title: 'Muvaffaqiyatli kirish',
			},
			loading: {
				title: 'Kirish amalga oshirilyapti...',
			},
			verifiedSwitchTab: {
				title: 'Pochta tasdiqlangan',
				subtitle: "Davom etish uchun yangi ochilgan varag'ga qayting",
				subtitleNewTab: "Davom etish uchun oldingi varag'ga qayting",
			},
		},
		emailCode: {
			title: 'Pochtangizni tasdiqlang',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			formTitle: 'Tasdiqlash kodi',
			formSubtitle: 'Pochtaga yuborilgan tasdiqlash kodi ni kiriting',
			resendButton: 'Kodni qayta yuborish',
		},
		phoneCode: {
			title: 'Telefon raqamingizni tasdiqlang',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			formTitle: 'Tasdiqlash kodi',
			formSubtitle: 'Telefongizga yuborilgan tasdiqlash kodi ni kiriting',
			resendButton: 'Kodni qayta yuborish',
		},
		continue: {
			title: "Barcha maydonlarni to'ldiring",
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			actionText: 'Aldan akkauntmiz bormi?',
			actionLink: 'Kirish',
		},
	},
	signIn: {
		start: {
			title: 'Kirish',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			actionText: "Akkount yo'qmi?",
			actionLink: "Ro'yxatdan o'tish",
			actionLink__use_email: 'Pochta ishlatish',
			actionLink__use_phone: 'Telefon raqamini ishlatish',
			actionLink__use_username: 'Foydalanuvchi nomini ishlatish',
			actionLink__use_email_username:
				'Pochta yoki foydalanuvchi nomini ishlatish',
		},
		password: {
			title: 'Parolni kiriting',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			actionLink: 'Boshqa usulni ishlatish',
		},
		forgotPasswordAlternativeMethods: {
			title: 'Parolingizni unutdingizmi?',
			label__alternativeMethods: 'Yoki, boshqa usul orqali kirish',
			blockButton__resetPassword: 'Parolni qayta tiklash',
		},
		forgotPassword: {
			subtitle_email: 'Pochtangizni tekshiring',
			subtitle_phone: 'Telefon raqamingizni tekshiring',
			subtitle: 'Parolni tiklash uchun',
			formTitle: 'Parolni qayta tiklash kodi',
			resendButton: 'Kodni qayta yuborish',
		},
		resetPassword: {
			title: 'Parolni qayta tiklash',
			formButtonPrimary: 'Parolni qayta tiklash',
			successMessage:
				"Sizning parolingiz muvaffaqiyatli o'zgartirildi. Kirish amalga oshirilyapti, kuting.",
		},
		resetPasswordMfa: {
			detailsLabel:
				"Parolni tiklashdan oldin shaxsiy ma'lumotlaringizni tasdiqlang",
		},
		emailCode: {
			title: 'Pochtangizni tekshiring',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			formTitle: 'Tasdiqlash kodi',
			// formSubtitle: 'Pochtaga yuborilgan tasdiqlash kodi ni kiriting',
			resendButton: 'Kodni qayta yuborish',
		},
		emailLink: {
			title: 'Pochtangizni tekshiring',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',
			formTitle: 'Tasdiqlash havolasi',
			formSubtitle: 'Pochtaga yuborilgan tasdiqlash havolasini ishlatish',
			resendButton: 'Havolani qayta yuborish',
			unusedTab: {
				title: 'Varaqni yopish mumkin',
			},
			verified: {
				title: 'Muvaffaqiyatli kirish',
				subtitle: "Siz tez orada yo'naltirilasiz",
			},
			verifiedSwitchTab: {
				subtitle: "Davom etish uchun boshqa varag'ga qayting",
				titleNewTab: "Yangi varag'ga kirishingiz mumkin",
				subtitleNewTab:
					"Davom etish uchun faqat boshqa ochilgan varag'ga qayting",
			},
			loading: {
				title: 'Kirish amalga oshirilyapti...',
				subtitle: "Siz tez orada yo'naltirilasiz",
			},
			failed: {
				title: "Bu tasdiqlash havolasi noto'g'ri.",
				subtitle: "Davom etish uchun boshqa varag'ga qayting.",
			},
			expired: {
				title: 'Bu tasdiqlash havolasi muddati tugagan',
				subtitle: "Davom etish uchun boshqa varag'ga qayting.",
			},
		},
		phoneCode: { ...commonTexts.signIn.phoneCode },
		phoneCodeMfa: { ...commonTexts.signIn.phoneCode, subtitle: '' },
		totpMfa: {
			title: 'Ikkinchi bosqichli tasdiqlash',
			subtitle: '',
			formTitle: 'Tasdiqlash kodi',
		},
		backupCodeMfa: {
			title: 'Qayta tiklash kodi ni kiriting',
			subtitle: '"{{applicationName}}" da ishlashni davom ettirish uchun',

		},
		alternativeMethods: {
			title: 'Boshqa usulni ishlatish',
			actionLink: 'Yordam',
			blockButton__emailLink: '{{identifier}} ga havola yuborish',
			blockButton__emailCode: '{{identifier}} ga kodi yuborish',
			blockButton__phoneCode: '{{identifier}} ga kodi yuborish',
			blockButton__password: 'Parol bilan kirish',
			blockButton__totp: 'Autentifikatorni ishlatish',
			blockButton__backupCode: 'Qayta tiklash kodi ishlatish',
			getHelp: {
				title: 'Yordam',
				content: `Agar siz akkauntingizga kirishda muammolar tug'ilgan bo'lsa, bizga yozing va biz tez orada kirishingizni tiklashga harakat qilamiz.`,
				blockButton__emailSupport: 'Yordam olish uchun yozing',
			},
		},
		noAvailableMethods: {
			title: 'Kirish mumkin emas',
			subtitle: 'Xatolik yuz berdi',
			message:
				"Kirish mumkin emas. Tasdiqlash uchun mavjud barcha faktorlar yo'q.",
		},
	},
	userProfile: {
		mobileButton__menu: 'Menyu',
		formButtonPrimary__continue: 'Davom etish',
		formButtonPrimary__finish: 'Tugatish',
		formButtonReset: 'Bekor qilish',
		start: {
			headerTitle__account: 'Hisob',
			headerTitle__security: 'Xavfsizlik',
			profileSection: {
				title: 'Profil',
			},
			usernameSection: {
				title: 'Foydalanuvchi nomi',
				primaryButton__updateUsername: "Foydalanuvchi nomini o'zgartirish",
				primaryButton__setUsername: 'Foydalanuvchi nomini sozlash',
			},
			// ... (the translation continues for the rest of the sections)
		},
		profilePage: {
			title: 'Profilni yangilash',
			imageFormTitle: 'Profil rasmi',
			imageFormSubtitle: 'Rasmni yuklash',
			imageFormDestructiveActionSubtitle: "Rasmni o'chirish",
			// fileDropAreaTitle: 'Faylni bu yerga tashlang yoki...',
			// fileDropAreaAction: 'Faylni tanlang',
			fileDropAreaHint:
				'JPG, PNG, GIF yoki WEBP formatidagi rasmni 10 MB dan kichikroq yuklang',
			successMessage: 'Sizning profiliz yangilandi.',
		},

		usernamePage: {
			// title: 'Foydalanuvchi nomini yangilash',
			successMessage: 'Foydalanuvchi nomi yangilandi.',
		},
		emailAddressPage: {
			title: "Elektron pochta manzilini qo'shish",
			emailCode: {
				formHint: 'Ushbu elektron pochta manziliga tasdiq kodi yuboriladi.',
				formTitle: 'Tasdiq kodi',
				formSubtitle: '{{identifier}} ga yuborilgan tasdiq kodi ni kiriting',
				resendButton: 'Kodni qayta yuborish',
				successMessage:
					"{{identifier}} elektron pochta manzili sizning hisobingizga qo'shildi.",
			},
			emailLink: {
				formHint: 'Ushbu elektron pochta manziliga tasdiq havolasi yuboriladi.',
				formTitle: 'Tasdiq havolasi',
				formSubtitle:
					'{{identifier}} ga yuborilgan tasdiq havolasini bosib oling',
				resendButton: 'Havolani qayta yuborish',
				successMessage:
					"{{identifier}} elektron pochta manzili sizning hisobingizga qo'shildi.",
			},
			removeResource: {
				title: 'Elektron pochta manzilini olib tashlash',
				messageLine1: '{{identifier}} ushbu hisobdan olib tashlanadi.',
				messageLine2:
					"Bu elektron pochta manzilidan foydalanib hisobga kirish imkoni yo'q.",
				successMessage:
					'{{emailAddress}} sizning hisobingizdan olib tashlandi.',
			},
		},
		phoneNumberPage: {
			title: "Telefon raqamini qo'shish",
			successMessage: "{{identifier}} sizning hisobingizga qo'shildi.",
			infoText: 'Ushbu telefon raqamiga tasdiq havolasi yuboriladi.',
			// infoText__secondary:
			// 	"Xabarlar va ma'lumotlar uchun tariflar qo'llanilishi mumkin.",
			removeResource: {
				title: 'Telefon raqamini olib tashlash',
				messageLine1: '{{identifier}} ushbu hisobdan olib tashlanadi.',
				messageLine2:
					"Bu telefon raqamidan foydalanib hisobga kirish imkoni yo'q.",
				successMessage: '{{phoneNumber}} sizning hisobingizdan olib tashlandi.',
			},
		},
		connectedAccountPage: {
			title: "Bog'langan hisobni qo'shish",
			formHint: "Hisobingizni bog'lash uchun provayderini tanlang.",
			formHint__noAccounts: 'Toshkent hisoblar provayderlari mavjud emas.',
			socialButtonsBlockButton: "{{provider|titleize}} hisobini bog'lash",
			successMessage: "Provayder sizning hisobingizga qo'shildi",
			removeResource: {
				title: "Bog'langan hisobni olib tashlash",
				messageLine1: '{{identifier}} ushbu hisobdan olib tashlanadi.',
				messageLine2:
					"Ushbu bog'langan hisobni ko'rsatadigan har qanday funksiya ishlamaydi.",
				successMessage:
					'{{connectedAccount}} sizning hisobingizdan olib tashlandi.',
			},
		},

		web3WalletPage: {
			title: "Web3 xususiy qog'ozni qo'shish",
			subtitle__availableWallets:
				"Hisobingizga bog'lanish uchun web3 xususiy qog'ozni tanlang.",
			subtitle__unavailableWallets: "Mavjud emas web3 xususiy qog'ozlar.",
			successMessage: "Qog'oz hisobingizga qo'shildi.",
			removeResource: {
				title: "Web3 xususiy qog'ozni olib tashlash",
				messageLine1: '{{identifier}} ushbu hisobdan olib tashlanadi.',
				messageLine2:
					"Siz ushbu web3 xususiy qog'ozi bilan kirish imkoniyatiga ega bo'lmaysiz.",
				successMessage: '{{web3Wallet}} sizning hisobingizdan olib tashlandi.',
			},
		},
		passwordPage: {
			title__set: 'Parolni sozlash',
			title__update: "Parolni o'zgartirish",
			successMessage__set: "Sizning parolingiz qo'shildi.",
			successMessage__update: 'Sizning parolingiz yangilandi.',
			successMessage__signOutOfOtherSessions:
				'Barcha boshqa qurilmalar tizimdan chiqarildi.',
		},
		mfaPage: {
			title: "Ikki bosqichli autentifikatsiyani qo'shish",
			formHint: "Qo'shish uchun usulni tanlang.",
		},
		mfaTOTPPage: {
			title: "Autentifikatsiya ilovasini qo'shish",
			verifyTitle: 'Tasdiq kodi',
			verifySubtitle: 'Ilovangiz tomonidan yaratilgan tasdiq kodi ni kiriting',
			successMessage:
				'Ikki bosqichli tekshiruva hozir faol. Tizimga kirishda sizga bu ilova tomonidan yaratilgan tasdiq kodi ni kiritish talab qilinadi.',
			authenticatorApp: {
				infoText__ableToScan:
					"O'zingizning autentifikatsiya ilovangizda yangi kirish usulini sozlang va quyidagi QR-kodni ushbu hisobingizga bog'lang.",
				infoText__unableToScan:
					"O'zingizning autentifikatsiya ilovangizda yangi kirish usulini sozlang va quyidagi kalitni kiritishni unutmang.",
				inputLabel__unableToScan1:
					"Vaqt asosida bir marta ishlatiladigan kalitni sozlang, keyin hisobingizni bog'lashni yakunlang.",
				inputLabel__unableToScan2:
					"Qo'shimcha, agar sizning autentifikatsiya ilovangiz URI TOTP ni qo'llayotgan bo'lsa, siz ham hammasini nusxalashni tanlaysiz.",
				buttonAbleToScan__nonPrimary: 'QR-kodni nusxalashni boshqa usul',
				buttonUnableToScan__nonPrimary: 'QR-kodni nusxalash mumkin emasmi?',
			},
			removeResource: {
				title: "Ikki bosqichli autentifikatsiyani o'chirish",
				messageLine1:
					'Bu autentifikatsiya ilovasidan olingan tasdiq kodi tizimga kirishda talab qilmaydi.',
				messageLine2:
					"Sizning hisobingiz kamroq himoyalangan bo'ladi. Davom etmoqchimisiz?",
				successMessage: "Ikki bosqichli autentifikatsiya ilovasi o'chirildi.",
			},
		},
		mfaPhoneCodePage: {
			title: "SMS-kodni tekshirishni qo'shish",
			primaryButton__addPhoneNumber: "Telefon raqamini qo'shish",
			subtitle__availablePhoneNumbers:
				'SMS-kod bilan ikki bosqichli tekshirish uchun telefon raqamini tanlang.',
			subtitle__unavailablePhoneNumbers:
				'SMS-kod bilan ikki bosqichli tekshirish uchun mavjud emas telefon raqamlari.',
			successMessage1:
				'Bu telefon raqamida SMS-kod bilan ikki bosqichli tekshirish faollashtirildi. Tizimga kirishda sizga bu telefon raqami tomonidan yuborilgan tasdiq kodi ni kiritish talab qilinadi.',
			removeResource: {
				title: "Ikki bosqichli tekshirishni o'chirish",
				messageLine1: "{{identifier}} qo'shimcha tasdiq kodi o'rmaydi.",
				messageLine2:
					"Sizning hisobingiz kamroq himoyalangan bo'ladi. Davom etmoqchimisiz?",
				successMessage:
					"{{mfaPhoneCode}} uchun SMS-kod bilan ikki bosqichli tekshirish o'chirildi.",
			},
		},
		backupCodePage: {
			title: "Yedek tasdiq kodi qo'shish",
			title__codelist: 'Yedek kodlar',
			subtitle__codelist: 'Ular saqlang va hech kimga aytmaslik.',
			infoText1: 'Bu hisob uchun yedek kodlar faollashtiriladi.',
			infoText2:
				'Yedek kodlarni maxfiy tuting va saqlab turing. Agar ular kompromatga uchraganligini tasavvur qilsangiz, yangi yedek kodlar yaratishingiz mumkin.',
			successSubtitle:
				"Agar siz avtentifikatsiya qurilmangizga kirishni yo'qotib, ularni ishlatishingiz mumkin bo'ladi.",
			successMessage:
				"Yedek kodlar faollashtirildi. Agar siz avtentifikatsiya qurilmangizga kirishni yo'qotib, ularni ishlatishingiz mumkin. Har bir kod faqat bir marta ishlatilishi mumkin.",
			actionLabel__copy: 'Hammasini nusxalash',
			actionLabel__copied: 'Nusxalandi!',
			actionLabel__download: '.txt-ni yuklab olish',
			actionLabel__print: 'Chop etish',
		},
	},
	userButton: {
		action__manageAccount: 'Hisobni boshqarish',
		action__signOut: 'Chiqish',
		action__signOutAll: 'Barcha hisoblaridan chiqish',
		action__addAccount: "Hisob qo'shish",
	},
	organizationSwitcher: {
		personalWorkspace: 'Shaxsiy ish joyi',
		notSelected: 'Tashkil etilmagan tashkilot',
		action__createOrganization: 'Tashkilot yaratish',
		action__manageOrganization: 'Tashkilotni boshqarish',
	},

	impersonationFab: {
		title: 'Siz {{identifier}} sifatida kirdingiz',
		action__signOut: 'Chiqish',
	},
	organizationProfile: {
		start: {
			headerTitle__members: "A'zolar",
			headerTitle__general: 'Sozlamalar',
		},
		profilePage: {
			title: 'Tashkilot profil',
			// subtitle: 'Tashkilot profilini boshqarish',
			successMessage: 'Tashkilot yangilandi.',
			dangerSection: {
				title: 'Xavotir',
				leaveOrganization: {
					title: 'Tashkilotni tark etish',
					messageLine1:
						"Haqiqatan ham ushbu tashkilotni tark etmoqchimisiz? Siz bu tashkilot va uning ilovalariga kirish imkoniyatingizni yo'qotasiz.",
					messageLine2: 'Bu amalni bekor qilish mumkin emas.',
					successMessage: 'Siz tashkilotni tark etdingiz.',
				},
				deleteOrganization: {
					title: "Tashkilotni o'chirish",
					messageLine1:
						"Haqiqatan ham ushbu tashkilotni o'chirishni xohlaysizmi?",
					messageLine2: 'Bu amalni bekor qilish mumkin emas.',
					actionDescription:
						"Davom etish uchun, quyidagi maydonni to'ldiring: {{organizationName}}.",
					successMessage: "Siz tashkilotni o'chirdingiz.",
				},
			},
			domainSection: {
				title: 'Tasdiqlangan domenlar',
				subtitle:
					"Foydalanuvchilarga, ularning elektron pochtasi domenlarini tasdiqlanmaguncha tashkilotga avtomatik ravishda yoki so'roq qilishlari mumkin bo'lsa, izin bering.",
				primaryButton: "Domen qo'shish",
				// unverifiedDomain_menuAction__verify: 'Domenni tasdiqlash',
				// unverifiedDomain_menuAction__remove: 'Domenni olib tashlash',
			},
		},
		createDomainPage: {
			title: "Domen qo'shish",
			subtitle:
				"Tasdiqlangan domenni qo'shing. Elektron pochtasi domenida ro'yxatdan o'tgan foydalanuvchilar, avtomatik ravishda yoki so'roq qilishlari mumkin bo'lsa, tashkilotga qo'shila olishlari mumkin.",
		},
		verifyDomainPage: {
			title: 'Domenni tasdiqlash',
			subtitle:
				'{{domainName}} domeni elektron pochta orqali tasdiqlanishi kerak.',
			subtitleVerificationCodeScreen:
				'Tasdiqlash kodi {{emailAddress}} elektron pochtasiga yuborildi. Davom etish uchun uni bu yerga kiriting.',
			formTitle: 'Tasdiqlash kodi',
			formSubtitle:
				'Belgilangan elektron pochtaga yuborilgan tasdiqlash kodi kiriting',
			resendButton: 'Kod kelayotganmi? Qayta yuborish',
		},
		verifiedDomainPage: {
			subtitle:
				"{{domain}} domeni tasdiqlandi. Endi foydalanuvchilar uni qanday qilib tashkilotga qo'shilishini tanlang.",
			start: {
				headerTitle__enrollment: "Qo'shilish usullari",
				headerTitle__danger: 'Xavotir',
			},
			enrollmentTab: {
				subtitle:
					"Elektron pochta domeni bo'lgan foydalanuvchilar tashkilotga qanday usulda qo'shilishlari kerakligini tanlang.",
				manualInvitationOption__label: "Faqat qo'l bilan qo'shish",
				manualInvitationOption__description:
					"Foydalanuvchilar o'zlarini avtomatik ravishda qo'shola olmasalar, ularni faqat qo'l bilan qo'shishingiz mumkin.",
				automaticInvitationOption__label: 'Avtomatik takliflar',
				automaticInvitationOption__description:
					"Foydalanuvchilar ro'yxatdan o'tgandan so'ng avtomatik ravishda tashkilotga qo'shilish uchun taklif olishadi va ular adminstrator tasdiqlamasi shart emas, har qanday vaqtda uni qabul qila olishadi.",
				automaticSuggestionOption__label: 'Avtomatik tavsiyalar',
				automaticSuggestionOption__description:
					"Foydalanuvchilar avtomatik ravishda tashkilotga qo'shilish uchun ariza yuborishga taklif olishadi. Foydalanuvchi tashkilotga qo'shilishi uchun administratorning roziligini talab qiladi.",
				// formButton__save: 'Saqlash',
				calloutInfoLabel:
					"Qo'shilish usulini o'zgartirish faqat yangi foydalanuvchilar uchun ta'sir ko'rsatadi.",
				calloutInvitationCountLabel: 'Takliflar yuborildi: {{count}}',
				calloutSuggestionCountLabel: 'Tavsiyalar yuborildi: {{count}}',
			},
			dangerTab: {
				removeDomainTitle: 'Domenni olib tashlash',
				removeDomainSubtitle:
					'Ushbu domenni tasdiqlanganlar sonidan olib tashlash',
				removeDomainActionLabel__remove: 'Domenni olib tashlash',
				calloutInfoLabel:
					"Domen olib tashlash foydalanuvchilarga ta'sir ko'rsatadi.",
			},
		},
		invitePage: {
			title: "A'zolarni taklif qilish",
			subtitle: "Yangi a'zolarni ushbu tashkilotga taklif qiling",
			successMessage: 'Takliflar muvaffaqiyatli yuborildi',
			detailsTitle__inviteFailed:
				"Takliflarni yuborish muvaffaqiyatli bo'lmadi. Quyidagilarni to'g'rilang va qayta urinib ko'ring:",
			formButtonPrimary__continue: 'Takliflarni yuborish',
		},
		membersPage: {
			detailsTitle__emptyRow: "Ko'rsatiladigan a'zolar yo'q",
			action__invite: 'Taklif qilish',
			start: {
				headerTitle__members: "A'zolar",
				headerTitle__invitations: 'Takliflar',
				headerTitle__requests: 'Arizalar',
			},
			activeMembersTab: {
				tableHeader__user: 'Foydalanuvchi',
				tableHeader__joined: "Qo'shildi",
				tableHeader__role: 'Rol',
				tableHeader__actions: 'Harakatlar',
				menuAction__remove: "A'zoni o'chirish",
			},
			invitedMembersTab: {
				tableHeader__invited: 'Taklif qilinganlar',
				menuAction__revoke: 'Taklifni bekor qilish',
			},
		},
	},

	createOrganization: {
		title: 'Tashkilot yaratish',
		formButtonSubmit: 'Tashkilotni yaratish',
		invitePage: {
			formButtonReset: "O'tkazib yuborish",
		},
	},
	unstable__errors: {
		form_identifier_not_found: '',
		form_password_pwned:
			"Bu parol hacklangan va ishlatilishi mumkin emas, boshqa parolni sinab ko'ring.",
		form_password_validation_failed: "Noto'g'ri parol",
		form_password_not_strong_enough:
			'Sizning parolingiz yetarli darajada xavfsiz emas.',
		form_password_size_in_bytes_exceeded:
			"Sizning parolingiz maksimal bayt sonini oshib ketdi, uni qisqartirib yoki ba'zi maxsus belgilarini olib tashlang.",
		form_username_invalid_length: '',
		form_username_invalid_character: '',
		form_param_format_invalid: '',
		form_password_length_too_short: '',
		form_param_nil: '',
		form_code_incorrect: '',
		form_password_incorrect: '',
		not_allowed_access: '',
		form_identifier_exists: '',
		passwordComplexity: {
			sentencePrefix: 'Parolingizda quyidagini kiriting',
			minimumLength: "{{length}} yoki undan ko'p belgi",
			maximumLength: '{{length}} dan kam belgi',
			requireNumbers: 'raqam',
			requireLowercase: 'kichik harf',
			requireUppercase: 'katta harf',
			requireSpecialCharacter: 'maxsus belgi',
		},
		zxcvbn: {
			notEnough: 'Sizning parolingiz yetarli darajada xavfsiz emas.',
			couldBeStronger:
				"Sizning parolingiz qo'pol, lekin unda ko'proq belgilar qo'shishingiz mumkin. Boshqa belgilar qo'shishni sinab ko'ring.",
			goodPassword: 'Juda yaxshi, bu ajoyib parol.',
			warnings: {
				straightRow: "Klaviaturadagi to'g'ri qatorlar oson aniqlanadi.",
				keyPattern: 'Qisqa klaviatura kombinatsiyalari oson aniqlanadi.',
				simpleRepeat: '"aaa" kabi takrorlanuvchi belgilar oson aniqlanadi.',
				extendedRepeat:
					'"abcabcabc" kabi takrorlanuvchi belgilar oson aniqlanadi.',
				sequences: `"abc" kabi ko'p paydo bo'ladigan ketma-ketliklar oson aniqlanadi.`,
				recentYears: "So'nggi yillar oson aniqlanadi.",
				dates: 'Sanalar oson aniqlanadi.',
				topTen: "Bu juda ko'p ishlatiladigan parol.",
				topHundred: "Bu ko'p ishlatiladigan parol.",
				common: 'Bu umumiy parol.',
				similarToCommon: "Bu parol ko'p ishlatiladigan parolga o'xshash.",
				wordByItself: "Faqat kelgan so'zlar oson aniqlanadi.",
				namesByThemselves: 'Faqat ism yoki familiya oson aniqlanadi.',
				commonNames: "Ko'p ishlatiladigan ism-familiyalar oson aniqlanadi.",
				userInputs:
					"Shaxsiy ma'lumot yoki sahifangizga oid ma'lumot bo'lishi mumkin emas.",
				pwned:
					"Bu parol internetda ma'lumotlar olinishi natijasida ifodalangan.",
			},
			suggestions: {
				l33t: `"@", "a" o'rniga ma'lumotlar kiritilgan "a" kabi kutilmagan belgilar qo'shishdan qoching.`,
				reverseWords:
					"Ko'p ishlatiladigan so'zlarni teskari kiritishdan qoching.",
				allUppercase: "Ba'zi, ammo barcha harflarni katta qiling.",
				capitalization:
					"Faqat birinchi harfini katta qiling, yangi qoidalar qo'shishdan qoching.",
				dates: "O'zingizga bog'liq bo'lgan sanalardan qoching.",
				recentYears: "So'nggi yillardan qoching.",
				associatedYears: "O'zingizga bog'liq bo'lgan yillardan qoching.",
				sequences: "Ko'p bo'ladigan ketma-ketliklardan qoching.",
				repeated: "Takrorlanuvchi so'zlar va belgilardan qoching.",
				longerKeyboardPattern:
					"Uzoq klaviatura kombinatsiyalarini ishlating va bir nechta marta yo'nalishni o'zgartiring.",
				anotherWord: "Ko'p ishlatilmaydigan so'zlar qo'shing.",
				useWords:
					"Bir nechta so'zlar ishlating, lekin umumiy so'zlaridan bo'linishingizdan qoching.",
				noNeed:
					'Belgilar, raqamlar yoki katta harflar ishlatmasdan ham xavfsiz parollar yarata olasiz.',
				pwned:
					"Agar bu parolingizni boshqa joyda ishlatasiz, uni o'zgartirishingiz kerak.",
			},
		},
	},

	dates: {
		previous6Days:
			"O'tgan {{ date | weekday('ru-RU','long') }} {{ date | timeString('ru-RU') }} da",
		lastDay: "Kecha {{ date | timeString('ru-RU') }} da",
		sameDay: "Bugun {{ date | timeString('ru-RU') }} da",
		nextDay: "Ertaga {{ date | timeString('ru-RU') }} da",
		next6Days:
			"{{ date | weekday('ru-RU','long') }} {{ date | timeString('ru-RU') }} da",
		numeric: "{{ date | numeric('ru-RU') }}",
	},
} as const
