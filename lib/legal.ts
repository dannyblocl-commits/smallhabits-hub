import type { Lang } from "@/lib/i18n";

export const LEGAL_CONTACT = "smallhabitsbymaleja@gmail.com";
export const LEGAL_UPDATED = "2026-09-27";

type Doc = { title: string; updated: string; sections: [string, string[]][] };

export const PRIVACY: Record<Lang, Doc> = {
  es: {
    title: "Política de privacidad",
    updated: "Última actualización",
    sections: [
      ["Quiénes somos", [`Small Habits by Maleja ("Small Habits", "nosotros") es una app de bienestar: entrenamiento, alimentación y hábitos, con acompañamiento de una coach. Para cualquier tema de privacidad escríbenos a ${LEGAL_CONTACT}.`]],
      ["Qué datos recogemos", [
        "Cuenta: nombre, email y contraseña (guardada cifrada, nunca en texto plano), o tu identificador de Google si entras con Google.",
        "Perfil y progreso: objetivo, peso, altura, entrenamientos completados, comidas que registras, fotos de progreso y mensajes con tu coach.",
        "Fotos de comida: si usas la función de foto, la imagen se envía a nuestro proveedor de IA solo para estimar calorías y no se guarda en nuestro almacenamiento.",
        "Relojes y salud: solo si conectas un dispositivo (Google Health, Apple Salud), leemos pasos, frecuencia cardiaca en reposo, calorías activas, sueño y entrenamientos. Nunca los usamos para publicidad.",
        "Inscripción al reto: teléfono, dirección de envío, objetivo, nivel y cualquier condición de salud que decidas contarnos.",
        "Pagos: los procesa Stripe (o Apple / Google en las apps). Nosotros no vemos ni guardamos tu tarjeta; solo sabemos qué plan tienes y su estado.",
      ]],
      ["Para qué los usamos", [
        "Darte el servicio: tus rutinas, menús, registro, progreso y el chat con tu coach.",
        "Que tu coach pueda acompañarte: ella ve tu progreso, tus comidas, tus fotos de progreso y tus mensajes.",
        "Soporte, seguridad (prevenir abusos y accesos indebidos) y cumplir la ley.",
        "No vendemos tus datos ni los usamos para publicidad de terceros.",
      ]],
      ["Con quién los compartimos", [
        "Solo con proveedores que hacen funcionar la app, bajo contrato: Vercel (alojamiento y almacenamiento de archivos), Neon (base de datos), Stripe (pagos), Anthropic (IA para calorías y asistente), Google (inicio de sesión y relojes, si los conectas), Cal.com (reserva de sesiones, si la usas).",
        "Tu coach, que es la responsable de acompañarte.",
        "Autoridades, solo si la ley nos obliga.",
      ]],
      ["Cuánto tiempo los guardamos", ["Mientras tengas cuenta. Si la eliminas, borramos tu perfil, registros, fotos y mensajes de inmediato; las copias de seguridad técnicas se sobrescriben en un plazo máximo de 30 días. Los registros de pago pueden conservarse lo que exija la ley fiscal."]],
      ["Tus derechos", [
        "Puedes ver y corregir tus datos en Mi perfil, descargarlos o pedir que los borremos escribiendo a " + LEGAL_CONTACT + ".",
        "Puedes eliminar tu cuenta tú misma en cualquier momento: Mi perfil → Eliminar mi cuenta.",
        "Si vives en California o en la Unión Europea tienes además los derechos de la CCPA / RGPD (acceso, borrado, portabilidad, oposición); los atendemos por el mismo email.",
      ]],
      ["Menores", ["La app es para mayores de 18 años. No recogemos a sabiendas datos de menores."]],
      ["Seguridad", ["Conexión cifrada (HTTPS), contraseñas cifradas, fotos en almacenamiento privado al que solo se accede con sesión, y límites contra intentos de acceso repetidos. Ningún sistema es 100 % seguro; si detectamos un incidente que te afecte, te avisaremos."]],
      ["Cambios", ["Si cambiamos esta política te lo diremos en la app. La fecha de arriba indica la última versión."]],
    ],
  },
  en: {
    title: "Privacy policy",
    updated: "Last updated",
    sections: [
      ["Who we are", [`Small Habits by Maleja ("Small Habits", "we") is a wellness app: training, nutrition and habits, with a coach. For any privacy matter email us at ${LEGAL_CONTACT}.`]],
      ["What we collect", [
        "Account: name, email and password (stored hashed, never in plain text), or your Google identifier if you sign in with Google.",
        "Profile and progress: goal, weight, height, completed workouts, meals you log, progress photos and messages with your coach.",
        "Meal photos: if you use the photo feature, the image is sent to our AI provider only to estimate calories and is not kept in our storage.",
        "Wearables and health: only if you connect a device (Google Health, Apple Health), we read steps, resting heart rate, active calories, sleep and workouts. We never use them for advertising.",
        "Challenge sign-up: phone, shipping address, goal, level and any health condition you choose to share.",
        "Payments: processed by Stripe (or Apple / Google in the apps). We never see or store your card; we only know your plan and its status.",
      ]],
      ["How we use it", [
        "To provide the service: your workouts, meal plans, log, progress and chat with your coach.",
        "So your coach can support you: she sees your progress, meals, progress photos and messages.",
        "Support, security (preventing abuse and unauthorized access) and legal compliance.",
        "We do not sell your data or use it for third-party advertising.",
      ]],
      ["Who we share it with", [
        "Only service providers that run the app, under contract: Vercel (hosting and file storage), Neon (database), Stripe (payments), Anthropic (AI for calories and the assistant), Google (sign-in and wearables, if connected), Cal.com (session booking, if used).",
        "Your coach, who is responsible for supporting you.",
        "Authorities, only when required by law.",
      ]],
      ["How long we keep it", ["While you have an account. If you delete it, we erase your profile, logs, photos and messages immediately; technical backups are overwritten within 30 days at most. Payment records may be kept as long as tax law requires."]],
      ["Your rights", [
        "You can view and correct your data in My profile, request a copy or ask us to delete it by emailing " + LEGAL_CONTACT + ".",
        "You can delete your account yourself at any time: My profile → Delete my account.",
        "If you live in California or the European Union you also have CCPA / GDPR rights (access, deletion, portability, objection); we handle them at the same email.",
      ]],
      ["Children", ["The app is for people 18 and over. We do not knowingly collect data from minors."]],
      ["Security", ["Encrypted connection (HTTPS), hashed passwords, photos in private storage reachable only with a session, and limits on repeated sign-in attempts. No system is 100% secure; if we detect an incident affecting you, we will let you know."]],
      ["Changes", ["If we change this policy we will tell you in the app. The date above shows the latest version."]],
    ],
  },
  pt: {
    title: "Política de privacidade",
    updated: "Última atualização",
    sections: [
      ["Quem somos", [`Small Habits by Maleja ("Small Habits", "nós") é um app de bem-estar: treino, alimentação e hábitos, com acompanhamento de uma coach. Para qualquer assunto de privacidade, escreva para ${LEGAL_CONTACT}.`]],
      ["Que dados coletamos", [
        "Conta: nome, email e senha (guardada criptografada, nunca em texto puro), ou seu identificador do Google se entrar com Google.",
        "Perfil e progresso: objetivo, peso, altura, treinos concluídos, refeições registradas, fotos de progresso e mensagens com sua coach.",
        "Fotos de comida: se você usa a função de foto, a imagem é enviada ao nosso provedor de IA apenas para estimar calorias e não fica no nosso armazenamento.",
        "Relógios e saúde: só se você conectar um dispositivo (Google Health, Apple Saúde), lemos passos, frequência cardíaca em repouso, calorias ativas, sono e treinos. Nunca usamos para publicidade.",
        "Inscrição no desafio: telefone, endereço de envio, objetivo, nível e qualquer condição de saúde que você decida contar.",
        "Pagamentos: processados pela Stripe (ou Apple / Google nos apps). Não vemos nem guardamos seu cartão; só sabemos seu plano e o status dele.",
      ]],
      ["Para que usamos", [
        "Prestar o serviço: seus treinos, cardápios, registros, progresso e o chat com sua coach.",
        "Para que sua coach acompanhe você: ela vê seu progresso, refeições, fotos de progresso e mensagens.",
        "Suporte, segurança (prevenir abusos e acessos indevidos) e cumprimento da lei.",
        "Não vendemos seus dados nem os usamos para publicidade de terceiros.",
      ]],
      ["Com quem compartilhamos", [
        "Somente com provedores que fazem o app funcionar, sob contrato: Vercel (hospedagem e arquivos), Neon (banco de dados), Stripe (pagamentos), Anthropic (IA de calorias e assistente), Google (login e relógios, se conectados), Cal.com (agendamento de sessões, se usado).",
        "Sua coach, responsável por acompanhar você.",
        "Autoridades, somente quando a lei exigir.",
      ]],
      ["Por quanto tempo guardamos", ["Enquanto você tiver conta. Se excluir, apagamos perfil, registros, fotos e mensagens na hora; backups técnicos são sobrescritos em até 30 dias. Registros de pagamento podem ser mantidos pelo prazo exigido pela lei fiscal."]],
      ["Seus direitos", [
        "Você pode ver e corrigir seus dados em Meu perfil, pedir uma cópia ou a exclusão escrevendo para " + LEGAL_CONTACT + ".",
        "Você pode excluir sua conta a qualquer momento: Meu perfil → Excluir minha conta.",
        "Se mora na Califórnia, na União Europeia ou no Brasil, tem também os direitos da CCPA / RGPD / LGPD (acesso, exclusão, portabilidade, oposição); atendemos pelo mesmo email.",
      ]],
      ["Menores", ["O app é para maiores de 18 anos. Não coletamos conscientemente dados de menores."]],
      ["Segurança", ["Conexão criptografada (HTTPS), senhas criptografadas, fotos em armazenamento privado acessível só com sessão e limites contra tentativas repetidas de acesso. Nenhum sistema é 100% seguro; se detectarmos um incidente que afete você, avisaremos."]],
      ["Mudanças", ["Se mudarmos esta política, avisaremos no app. A data acima indica a última versão."]],
    ],
  },
};

export const TERMS: Record<Lang, Doc> = {
  es: {
    title: "Términos de uso",
    updated: "Última actualización",
    sections: [
      ["Aceptación", ["Al crear una cuenta o usar Small Habits aceptas estos términos. Si no estás de acuerdo, no uses la app. Debes tener 18 años o más."]],
      ["No es consejo médico", ["El contenido (rutinas, menús, recetas, estimaciones de calorías de la IA, mensajes de la coach) es educativo y general. No sustituye a un médico, nutricionista ni fisioterapeuta. Consulta a un profesional de salud antes de empezar, sobre todo si estás embarazada, lactando, tienes una lesión, una condición de salud o tomas medicación. Detente ante cualquier dolor. Practicas bajo tu responsabilidad."]],
      ["Estimaciones de la IA", ["Las calorías y macros que calcula la IA a partir de fotos o texto son aproximadas y pueden equivocarse. Úsalas como guía, no como medida exacta."]],
      ["Suscripciones y pagos", [
        "Los planes de pago se renuevan automáticamente cada mes hasta que los canceles. Puedes cancelar cuando quieras; conservas el acceso hasta el final del periodo ya pagado.",
        "Si pagaste en la web, se cobra con Stripe y cancelas escribiéndonos o desde el enlace de tu recibo. Si pagaste dentro de la app de iPhone o Android, se cobra y se cancela desde la configuración de suscripciones de Apple o Google, y aplican sus políticas de reembolso.",
        "El Reto de 30 días pagado por separado es un pago único sin renovación.",
      ]],
      ["Tu cuenta", ["Eres responsable de guardar tu contraseña y de lo que se haga con tu cuenta. No compartas la cuenta. Podemos suspender cuentas que abusen del servicio, intenten acceder a datos de otros o infrinjan estos términos."]],
      ["Contenido", ["Rutinas, videos, recetas, textos y la marca Small Habits pertenecen a sus autores y están protegidos. Puedes usarlos para tu uso personal; no para revenderlos ni publicarlos. Lo que tú subes (fotos, mensajes) sigue siendo tuyo; nos das permiso solo para guardarlo y mostrarlo a ti y a tu coach dentro del servicio."]],
      ["Productos de terceros", ["Si compras productos (por ejemplo suplementos) a tu coach o a terceros, esa compra es independiente de la app y se rige por las condiciones del vendedor."]],
      ["Limitación de responsabilidad", ["La app se ofrece \"tal cual\". En la medida que permita la ley, no respondemos por lesiones, resultados o daños indirectos derivados del uso del contenido, ni por interrupciones del servicio."]],
      ["Cambios y contacto", [`Podemos actualizar estos términos y te avisaremos en la app. Ley aplicable: Florida, EE. UU. Contacto: ${LEGAL_CONTACT}.`]],
    ],
  },
  en: {
    title: "Terms of use",
    updated: "Last updated",
    sections: [
      ["Acceptance", ["By creating an account or using Small Habits you accept these terms. If you don't agree, don't use the app. You must be 18 or older."]],
      ["Not medical advice", ["The content (workouts, meal plans, recipes, AI calorie estimates, coach messages) is general and educational. It does not replace a doctor, dietitian or physical therapist. Consult a health professional before starting, especially if you are pregnant, nursing, injured, have a medical condition or take medication. Stop if you feel pain. You train at your own risk."]],
      ["AI estimates", ["Calories and macros estimated by the AI from photos or text are approximate and can be wrong. Use them as a guide, not an exact measurement."]],
      ["Subscriptions and payments", [
        "Paid plans renew automatically every month until you cancel. You can cancel anytime and keep access until the end of the period already paid.",
        "If you paid on the web, you are charged through Stripe and can cancel by emailing us or from your receipt link. If you paid inside the iPhone or Android app, billing and cancellation are handled in your Apple or Google subscription settings, and their refund policies apply.",
        "The separately purchased 30-Day Challenge is a one-time payment with no renewal.",
      ]],
      ["Your account", ["You are responsible for keeping your password safe and for activity on your account. Do not share it. We may suspend accounts that abuse the service, try to access others' data or break these terms."]],
      ["Content", ["Workouts, videos, recipes, texts and the Small Habits brand belong to their authors and are protected. You may use them personally, not resell or republish them. What you upload (photos, messages) stays yours; you give us permission only to store it and show it to you and your coach within the service."]],
      ["Third-party products", ["If you buy products (for example supplements) from your coach or others, that purchase is separate from the app and governed by the seller's terms."]],
      ["Limitation of liability", ["The app is provided \"as is\". To the extent the law allows, we are not liable for injuries, results or indirect damages arising from use of the content, nor for service interruptions."]],
      ["Changes and contact", [`We may update these terms and will notify you in the app. Governing law: Florida, USA. Contact: ${LEGAL_CONTACT}.`]],
    ],
  },
  pt: {
    title: "Termos de uso",
    updated: "Última atualização",
    sections: [
      ["Aceitação", ["Ao criar uma conta ou usar o Small Habits você aceita estes termos. Se não concordar, não use o app. Você precisa ter 18 anos ou mais."]],
      ["Não é aconselhamento médico", ["O conteúdo (treinos, cardápios, receitas, estimativas de calorias da IA, mensagens da coach) é geral e educativo. Não substitui médico, nutricionista ou fisioterapeuta. Consulte um profissional de saúde antes de começar, principalmente se estiver grávida, amamentando, lesionada, com alguma condição de saúde ou tomando medicação. Pare se sentir dor. Você treina por sua conta e risco."]],
      ["Estimativas da IA", ["Calorias e macros estimadas pela IA a partir de fotos ou texto são aproximadas e podem errar. Use como guia, não como medida exata."]],
      ["Assinaturas e pagamentos", [
        "Os planos pagos renovam automaticamente todo mês até você cancelar. Pode cancelar quando quiser e mantém o acesso até o fim do período já pago.",
        "Se pagou na web, a cobrança é pela Stripe e você cancela nos escrevendo ou pelo link do recibo. Se pagou dentro do app de iPhone ou Android, a cobrança e o cancelamento são feitos nas configurações de assinaturas da Apple ou do Google, e valem as políticas de reembolso deles.",
        "O Desafio de 30 dias comprado à parte é um pagamento único, sem renovação.",
      ]],
      ["Sua conta", ["Você é responsável por guardar sua senha e pelo que é feito com sua conta. Não compartilhe. Podemos suspender contas que abusem do serviço, tentem acessar dados de outras pessoas ou violem estes termos."]],
      ["Conteúdo", ["Treinos, vídeos, receitas, textos e a marca Small Habits pertencem aos seus autores e são protegidos. Você pode usar para uso pessoal, não revender nem publicar. O que você envia (fotos, mensagens) continua sendo seu; você nos autoriza apenas a guardar e mostrar para você e sua coach dentro do serviço."]],
      ["Produtos de terceiros", ["Se você compra produtos (por exemplo suplementos) da sua coach ou de terceiros, essa compra é separada do app e segue as condições do vendedor."]],
      ["Limitação de responsabilidade", ["O app é oferecido \"como está\". Na medida permitida pela lei, não respondemos por lesões, resultados ou danos indiretos do uso do conteúdo, nem por interrupções do serviço."]],
      ["Mudanças e contato", [`Podemos atualizar estes termos e avisaremos no app. Lei aplicável: Flórida, EUA. Contato: ${LEGAL_CONTACT}.`]],
    ],
  },
};

export const DELETE_INFO: Record<Lang, { title: string; body: string[]; inApp: string; email: string; what: string[]; kept: string }> = {
  es: {
    title: "Eliminar tu cuenta de Small Habits",
    body: ["Puedes eliminar tu cuenta y todos tus datos cuando quieras."],
    inApp: "Desde la app: entra con tu cuenta → Mi perfil → Eliminar mi cuenta. Es inmediato.",
    email: `Sin la app: escribe desde el email de tu cuenta a ${LEGAL_CONTACT} con el asunto "Eliminar mi cuenta". Lo hacemos en un máximo de 7 días y te confirmamos.`,
    what: ["Se borran: tu perfil, peso y medidas, comidas registradas, entrenamientos, fotos de progreso, mensajes con tu coach, tickets, inscripción al reto y conexiones con relojes."],
    kept: "Se conservan solo los registros de pago que la ley fiscal nos obliga a guardar (sin tus datos de salud). Si tienes una suscripción de Apple o Google, cancélala también en la configuración de tu teléfono: eliminar la cuenta no la cancela allí.",
  },
  en: {
    title: "Delete your Small Habits account",
    body: ["You can delete your account and all your data at any time."],
    inApp: "In the app: sign in → My profile → Delete my account. It is immediate.",
    email: `Without the app: email ${LEGAL_CONTACT} from your account email with the subject "Delete my account". We do it within 7 days and confirm.`,
    what: ["Deleted: your profile, weight and measurements, meal logs, workouts, progress photos, messages with your coach, tickets, challenge sign-up and wearable connections."],
    kept: "We keep only the payment records tax law requires (without your health data). If you have an Apple or Google subscription, cancel it in your phone's settings too: deleting the account does not cancel it there.",
  },
  pt: {
    title: "Excluir sua conta do Small Habits",
    body: ["Você pode excluir sua conta e todos os seus dados quando quiser."],
    inApp: "No app: entre com sua conta → Meu perfil → Excluir minha conta. É imediato.",
    email: `Sem o app: escreva do email da sua conta para ${LEGAL_CONTACT} com o assunto "Excluir minha conta". Fazemos em até 7 dias e confirmamos.`,
    what: ["São apagados: perfil, peso e medidas, refeições registradas, treinos, fotos de progresso, mensagens com sua coach, tickets, inscrição no desafio e conexões com relógios."],
    kept: "Mantemos apenas os registros de pagamento exigidos pela lei fiscal (sem seus dados de saúde). Se tiver assinatura da Apple ou do Google, cancele também nas configurações do celular: excluir a conta não cancela lá.",
  },
};
