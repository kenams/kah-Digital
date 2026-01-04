from __future__ import annotations

from pathlib import Path
from io import BytesIO
from urllib.request import urlopen

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

BASE_DIR = Path(__file__).resolve().parents[1]
OUTPUT_PATH = BASE_DIR / "public" / "cahier-des-charges.pdf"
OUTPUT_PATH_EN = BASE_DIR / "public" / "cahier-des-charges.en.pdf"
FONT_PATH = (
    BASE_DIR
    / "node_modules"
    / "next"
    / "dist"
    / "compiled"
    / "@vercel"
    / "og"
    / "noto-sans-v27-latin-regular.ttf"
)
LOGO_PATH = BASE_DIR / "public" / "apple-touch-icon.png"

FONT_NAME = "NotoSans"
FALLBACK_FONT = "Helvetica"

BG_COLOR = colors.HexColor("#0B0B0B")
CARD_COLOR = colors.HexColor("#1B1814")
TEXT_COLOR = colors.HexColor("#F7F1E6")
MUTED_COLOR = colors.HexColor("#C7BBA4")
ACCENT_COLOR = colors.HexColor("#D6B36A")
LINE_COLOR = colors.HexColor("#3A2F1F")
FIELD_BG_COLOR = colors.HexColor("#14110D")

AI_GUIDE_ITEMS_FR = [
    {
        "title": "Automatisation relation client",
        "summary": "Reponses, devis et relances automatiques avec le ton de la marque.",
        "pricing": "Budget indicatif: 2 900 - 6 900 EUR",
        "timeline": "Mise en place: 2-4 semaines",
        "image": "https://kripesh.b-cdn.net/wp-content/uploads/2023/08/Benefits-of-AI-Tools-for-small-business.jpg",
    },
    {
        "title": "Chatbot metier & support",
        "summary": "Assistant entraine sur vos contenus pour filtrer et repondre 24/7.",
        "pricing": "Budget indicatif: 3 500 - 9 000 EUR",
        "timeline": "Mise en place: 3-5 semaines",
        "image": "https://sendbird.imgix.net/cms/Chatbot-UI_Ecommerce-and-customer-service-chatbots.png",
    },
    {
        "title": "Qualification & lead scoring",
        "summary": "Formulaires intelligents, scoring et routage vers l'equipe.",
        "pricing": "Budget indicatif: 2 400 - 5 900 EUR",
        "timeline": "Mise en place: 2-3 semaines",
        "image": "https://assets.crm.io/static/images/website/blog/ai-powered-linkedin-automation.jpg",
    },
    {
        "title": "Contenu & assets IA",
        "summary": "Templates, contenus et scripts alignes a votre marque.",
        "pricing": "Budget indicatif: 1 800 - 4 500 EUR",
        "timeline": "Mise en place: 1-2 semaines",
        "image": "https://files.selar.co/product-images/2024/products/digital-spider1/ai-ebook-creator-2-selar.co-659aea700bb13.jpg",
    },
    {
        "title": "Micro-outil IA sur-mesure",
        "summary": "Outil interne: resume, extraction, tri ou aide a la decision.",
        "pricing": "Budget indicatif: 4 900 - 12 000 EUR",
        "timeline": "MVP: 4-6 semaines",
        "image": "https://cdn.dribbble.com/userupload/18350565/file/original-9e4dbb6e38b8ac5eac4089ecf1e2f1c5.png",
    },
]

AI_GUIDE_ITEMS_EN = [
    {
        "title": "Client automation layer",
        "summary": "Automated replies, quotes, and follow-ups with brand tone.",
        "pricing": "Indicative budget: 2,900 - 6,900 EUR",
        "timeline": "Setup: 2-4 weeks",
        "image": "https://kripesh.b-cdn.net/wp-content/uploads/2023/08/Benefits-of-AI-Tools-for-small-business.jpg",
    },
    {
        "title": "Industry chatbot & support",
        "summary": "Assistant trained on your content to answer 24/7 and filter requests.",
        "pricing": "Indicative budget: 3,500 - 9,000 EUR",
        "timeline": "Setup: 3-5 weeks",
        "image": "https://sendbird.imgix.net/cms/Chatbot-UI_Ecommerce-and-customer-service-chatbots.png",
    },
    {
        "title": "Lead qualification & scoring",
        "summary": "Smart forms, scoring, and routing for sales teams.",
        "pricing": "Indicative budget: 2,400 - 5,900 EUR",
        "timeline": "Setup: 2-3 weeks",
        "image": "https://assets.crm.io/static/images/website/blog/ai-powered-linkedin-automation.jpg",
    },
    {
        "title": "AI content & assets pack",
        "summary": "Templates, copy, and scripts aligned with your brand.",
        "pricing": "Indicative budget: 1,800 - 4,500 EUR",
        "timeline": "Setup: 1-2 weeks",
        "image": "https://files.selar.co/product-images/2024/products/digital-spider1/ai-ebook-creator-2-selar.co-659aea700bb13.jpg",
    },
    {
        "title": "Custom AI micro-tool",
        "summary": "Internal tool for summaries, extraction, or decision support.",
        "pricing": "Indicative budget: 4,900 - 12,000 EUR",
        "timeline": "MVP: 4-6 weeks",
        "image": "https://cdn.dribbble.com/userupload/18350565/file/original-9e4dbb6e38b8ac5eac4089ecf1e2f1c5.png",
    },
]

COPY_FR = {
    "header_page": "Cahier des charges premium - Page {page}/{total}",
    "footer_note": "Ce document sert de base pour cadrer le projet. Merci de completer les zones.",
    "page1": {
        "title": "Cahier des charges",
        "subtitle": "Version premium pour cadrer votre projet digital rapidement.",
        "cards": {
            "project": "Infos projet",
            "impact": "Objectifs & impact",
            "contact": "Contact principal",
            "audience": "Audience & canaux",
            "features": "Fonctionnalites prioritaires",
        },
        "fields": {
            "project_name": "Nom du projet",
            "project_type": "Type de projet (site, app, MVP, e-commerce)",
            "project_goal": "Objectif principal",
            "project_budget": "Budget indicatif",
            "project_date": "Date souhaitee",
            "impact_detail": "Objectifs detaille",
            "contact_name_role": "Nom & role",
            "contact_email": "Email",
            "contact_phone": "Telephone",
            "contact_company": "Societe",
            "contact_location": "Ville / Pays",
        },
        "impact_hint": (
            "Exemples : generer des leads qualifies, automatiser un process, vendre en ligne, "
            "ameliorer la conversion, accelerer un MVP."
        ),
        "audience_labels": ["B2B", "B2C", "Interne", "International", "Communautaire"],
        "features_left": [
            "Landing page / vitrine",
            "E-commerce / catalogue",
            "MVP application mobile",
            "Dashboard admin",
        ],
        "features_right": [
            "Paiement en ligne / abonnements",
            "Automations & CRM",
            "Contenu dynamique / CMS",
            "Multilingue / SEO",
        ],
    },
    "page2": {
        "title": "Precisions techniques",
        "subtitle": "Un complement pour definir le niveau de finition.",
        "cards": {
            "design": "Design & contenu",
            "integrations": "Integrations & donnees",
            "pages": "Pages / ecrans a prevoir",
        },
        "design_hint": (
            "Avez-vous deja une charte graphique, un logo, un ton editorial ou des contenus ? "
            "Precisez les references visuelles ou le style souhaite."
        ),
        "fields": {
            "design_references": "Liens d'inspiration / exemples",
            "design_content": "Contenu disponible",
            "pages_primary": "Pages principales",
            "pages_secondary": "Autres ecrans",
        },
        "integrations_left": [
            "Paiement (Stripe, PayPal, etc.)",
            "CRM / marketing (HubSpot, Brevo)",
            "Analytics / tracking",
            "Newsletter / emailing",
        ],
        "integrations_right": [
            "Gestion de contenu (CMS)",
            "Connexion API externe",
            "Auth / espace membre",
            "Automations / webhook",
        ],
    },
    "page3": {
        "title": "Planning & validation",
        "subtitle": "Finalisez les dates et la signature du projet.",
        "cards": {
            "planning": "Planning & jalons",
            "signature": "Validation & signature",
        },
        "planning_target": "Date cible",
        "planning_rows": [
            "Kickoff & cadrage",
            "Design & prototype",
            "Developpement",
            "Livraison & mise en ligne",
        ],
        "fields": {
            "sign_client_name": "Nom client",
            "sign_client": "Signature client",
            "sign_kd_name": "Nom Kah-Digital",
            "sign_kd": "Signature Kah-Digital",
        },
        "terms_note": "Modalites conseillees : 50% a la validation, 50% avant livraison finale.",
    },
    "page4": {
        "title": "Modules IA premium",
        "subtitle": "Options pour gagner du temps et augmenter la conversion.",
    },
}

COPY_EN = {
    "header_page": "Project brief premium - Page {page}/{total}",
    "footer_note": "This document is the base to frame the project. Please complete the fields.",
    "page1": {
        "title": "Project brief",
        "subtitle": "Premium version to frame your digital project quickly.",
        "cards": {
            "project": "Project info",
            "impact": "Goals & impact",
            "contact": "Main contact",
            "audience": "Audience & channels",
            "features": "Priority features",
        },
        "fields": {
            "project_name": "Project name",
            "project_type": "Project type (website, app, MVP, e-commerce)",
            "project_goal": "Primary goal",
            "project_budget": "Indicative budget",
            "project_date": "Desired date",
            "impact_detail": "Detailed goals",
            "contact_name_role": "Name & role",
            "contact_email": "Email",
            "contact_phone": "Phone",
            "contact_company": "Company",
            "contact_location": "City / Country",
        },
        "impact_hint": (
            "Examples: generate qualified leads, automate a process, sell online, "
            "improve conversion, accelerate an MVP."
        ),
        "audience_labels": ["B2B", "B2C", "Internal", "International", "Community"],
        "features_left": [
            "Landing page / showcase",
            "E-commerce / catalog",
            "Mobile app MVP",
            "Admin dashboard",
        ],
        "features_right": [
            "Online payments / subscriptions",
            "Automations & CRM",
            "Dynamic content / CMS",
            "Multilingual / SEO",
        ],
    },
    "page2": {
        "title": "Technical details",
        "subtitle": "A complement to define the level of finish.",
        "cards": {
            "design": "Design & content",
            "integrations": "Integrations & data",
            "pages": "Pages / screens to plan",
        },
        "design_hint": (
            "Do you already have a brand guide, logo, tone, or content? "
            "Share visual references or the desired style."
        ),
        "fields": {
            "design_references": "Inspiration links / examples",
            "design_content": "Available content",
            "pages_primary": "Main pages",
            "pages_secondary": "Other screens",
        },
        "integrations_left": [
            "Payments (Stripe, PayPal, etc.)",
            "CRM / marketing (HubSpot, Brevo)",
            "Analytics / tracking",
            "Newsletter / emailing",
        ],
        "integrations_right": [
            "Content management (CMS)",
            "External API connection",
            "Auth / member area",
            "Automations / webhook",
        ],
    },
    "page3": {
        "title": "Timeline & validation",
        "subtitle": "Finalize dates and signatures for the project.",
        "cards": {
            "planning": "Timeline & milestones",
            "signature": "Validation & signature",
        },
        "planning_target": "Target date",
        "planning_rows": [
            "Kickoff & scoping",
            "Design & prototype",
            "Development",
            "Delivery & launch",
        ],
        "fields": {
            "sign_client_name": "Client name",
            "sign_client": "Client signature",
            "sign_kd_name": "Kah-Digital name",
            "sign_kd": "Kah-Digital signature",
        },
        "terms_note": "Recommended terms: 50% on validation, 50% before final delivery.",
    },
    "page4": {
        "title": "Premium AI modules",
        "subtitle": "Options to save time and improve conversion.",
    },
}


def register_font() -> str:
    if FONT_PATH.exists():
        pdfmetrics.registerFont(TTFont(FONT_NAME, str(FONT_PATH)))
        return FONT_NAME
    return FALLBACK_FONT


def set_font(c: canvas.Canvas, size: float, color: colors.Color = TEXT_COLOR) -> None:
    c.setFont(ACTIVE_FONT, size)
    c.setFillColor(color)


def draw_header(c: canvas.Canvas, page_num: int, total_pages: int, copy: dict) -> None:
    c.saveState()
    c.setFillColor(BG_COLOR)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(colors.HexColor("#0E0C0A"))
    c.rect(0, PAGE_H - 36 * mm, PAGE_W, 36 * mm, stroke=0, fill=1)
    c.setFillColor(colors.HexColor("#15110D"))
    c.rect(PAGE_W / 2, PAGE_H - 36 * mm, PAGE_W / 2, 36 * mm, stroke=0, fill=1)
    if LOGO_PATH.exists():
        try:
            logo = ImageReader(str(LOGO_PATH))
            c.drawImage(logo, 20 * mm, PAGE_H - 30 * mm, 12 * mm, 12 * mm, mask="auto")
        except Exception:
            pass
    set_font(c, 13, TEXT_COLOR)
    c.drawString(36 * mm, PAGE_H - 16 * mm, "Kah-Digital")
    set_font(c, 9, MUTED_COLOR)
    c.drawRightString(
        PAGE_W - 20 * mm,
        PAGE_H - 16 * mm,
        copy["header_page"].format(page=page_num, total=total_pages),
    )
    c.setStrokeColor(ACCENT_COLOR)
    c.setLineWidth(1.1)
    c.line(MARGIN, PAGE_H - 36 * mm, PAGE_W - MARGIN, PAGE_H - 36 * mm)
    c.restoreState()


def draw_title(c: canvas.Canvas, title: str, subtitle: str) -> None:
    set_font(c, 22, TEXT_COLOR)
    c.drawString(MARGIN, PAGE_H - 50 * mm, title)
    set_font(c, 11, MUTED_COLOR)
    c.drawString(MARGIN, PAGE_H - 57 * mm, subtitle)


def draw_card(c: canvas.Canvas, x: float, y_top: float, width: float, height: float, title: str) -> float:
    c.saveState()
    c.setFillColor(CARD_COLOR)
    c.roundRect(x, y_top - height, width, height, 8, stroke=0, fill=1)
    c.setStrokeColor(LINE_COLOR)
    c.setLineWidth(0.7)
    c.roundRect(x, y_top - height, width, height, 8, stroke=1, fill=0)
    set_font(c, 10, TEXT_COLOR)
    c.drawString(x + 10, y_top - 16, title)
    c.restoreState()
    return y_top - 28


def draw_field(
    c: canvas.Canvas,
    label: str,
    x: float,
    y: float,
    width: float,
    name: str | None = None,
    height: float = 12,
) -> float:
    set_font(c, 8, MUTED_COLOR)
    c.drawString(x, y, label)
    if name:
        field_y = y - height - 6
        c.setFillColor(FIELD_BG_COLOR)
        c.rect(x, field_y, width, height, stroke=0, fill=1)
        c.acroForm.textfield(
            name=name,
            x=x,
            y=field_y,
            width=width,
            height=height,
            borderWidth=0.9,
            borderStyle="solid",
            borderColor=ACCENT_COLOR,
            fillColor=FIELD_BG_COLOR,
            textColor=TEXT_COLOR,
            fontName=FALLBACK_FONT,
            fontSize=9,
            forceBorder=True,
        )
        return field_y - 12
    c.setStrokeColor(LINE_COLOR)
    c.setLineWidth(0.6)
    c.line(x, y - 6, x + width, y - 6)
    return y - 18


def draw_paragraph(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    size: float = 9,
    leading: float = 12,
    color: colors.Color = MUTED_COLOR,
) -> float:
    set_font(c, size, color)
    lines = simpleSplit(text, ACTIVE_FONT, size, width)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_checkbox(
    c: canvas.Canvas,
    label: str,
    x: float,
    y: float,
    width: float,
    name: str | None = None,
) -> float:
    box = 10
    box_y = y - box + 1
    if name:
        c.acroForm.checkbox(
            name=name,
            x=x,
            y=box_y,
            size=box,
            borderColor=ACCENT_COLOR,
            fillColor=FIELD_BG_COLOR,
            textColor=ACCENT_COLOR,
            borderWidth=1,
            borderStyle="solid",
            fieldFlags="",
            forceBorder=True,
        )
    else:
        c.setStrokeColor(ACCENT_COLOR)
        c.setLineWidth(1.1)
        c.setFillColor(FIELD_BG_COLOR)
        c.rect(x, box_y, box, box, stroke=1, fill=1)
    set_font(c, 9, TEXT_COLOR)
    lines = simpleSplit(label, ACTIVE_FONT, 9, width - box - 10)
    c.drawString(x + box + 6, y, lines[0])
    for extra in lines[1:]:
        y -= 12
        c.drawString(x + box + 6, y, extra)
    return y - 16


def draw_table_row(
    c: canvas.Canvas,
    x: float,
    y: float,
    width: float,
    left: str,
    right: str | None = None,
    field_name: str | None = None,
    field_width: float = 70,
) -> float:
    set_font(c, 9, TEXT_COLOR)
    c.drawString(x, y, left)
    if field_name:
        field_x = x + width - field_width
        field_y = y - 12
        c.setFillColor(FIELD_BG_COLOR)
        c.rect(field_x, field_y, field_width, 10, stroke=0, fill=1)
        c.acroForm.textfield(
            name=field_name,
            x=field_x,
            y=field_y,
            width=field_width,
            height=10,
            borderWidth=0.9,
            borderStyle="solid",
            borderColor=ACCENT_COLOR,
            fillColor=FIELD_BG_COLOR,
            textColor=TEXT_COLOR,
            fontName=FALLBACK_FONT,
            fontSize=9,
            forceBorder=True,
        )
    elif right:
        set_font(c, 9, MUTED_COLOR)
        c.drawRightString(x + width, y, right)
    c.setStrokeColor(LINE_COLOR)
    c.setLineWidth(0.6)
    c.line(x, y - 6, x + width, y - 6)
    return y - 16


def draw_footer(c: canvas.Canvas, copy: dict) -> None:
    c.saveState()
    c.setStrokeColor(LINE_COLOR)
    c.setLineWidth(0.7)
    c.line(MARGIN, 18 * mm, PAGE_W - MARGIN, 18 * mm)
    set_font(c, 8, MUTED_COLOR)
    c.drawString(MARGIN, 12 * mm, copy["footer_note"])
    c.restoreState()


TOTAL_PAGES = 4


def load_remote_image(url: str):
    try:
        with urlopen(url, timeout=6) as response:
            return ImageReader(BytesIO(response.read()))
    except Exception:
        return None


def draw_ai_card(c: canvas.Canvas, x: float, y_top: float, width: float, height: float, item: dict) -> float:
    c.saveState()
    c.setFillColor(CARD_COLOR)
    c.roundRect(x, y_top - height, width, height, 8, stroke=0, fill=1)
    c.setStrokeColor(LINE_COLOR)
    c.setLineWidth(0.7)
    c.roundRect(x, y_top - height, width, height, 8, stroke=1, fill=0)

    img_size = height - 12
    img_x = x + 8
    img_y = y_top - height + 6
    image = load_remote_image(item["image"])
    if image:
        c.drawImage(image, img_x, img_y, img_size, img_size, mask="auto", preserveAspectRatio=True)
    else:
        c.setFillColor(FIELD_BG_COLOR)
        c.rect(img_x, img_y, img_size, img_size, stroke=0, fill=1)

    text_x = img_x + img_size + 10
    text_w = width - (img_size + 20)
    title_y = y_top - 12
    set_font(c, 10, TEXT_COLOR)
    c.drawString(text_x, title_y, item["title"])
    summary_y = title_y - 10
    summary_y = draw_paragraph(c, item["summary"], text_x, summary_y, text_w, size=8, leading=9, color=MUTED_COLOR)
    set_font(c, 8, ACCENT_COLOR)
    c.drawString(text_x, y_top - height + 18, item["pricing"])
    set_font(c, 8, MUTED_COLOR)
    c.drawString(text_x, y_top - height + 8, item["timeline"])
    c.restoreState()
    return y_top - height - 6


def build_page_one(c: canvas.Canvas, copy: dict) -> None:
    page = copy["page1"]
    draw_header(c, 1, TOTAL_PAGES, copy)
    draw_title(c, page["title"], page["subtitle"])

    content_top = PAGE_H - 66 * mm
    col_w = (PAGE_W - 2 * MARGIN - GUTTER) / 2
    left_x = MARGIN
    right_x = MARGIN + col_w + GUTTER

    y_left = draw_card(c, left_x, content_top, col_w, 86 * mm, page["cards"]["project"])
    y_left = draw_field(c, page["fields"]["project_name"], left_x + 10, y_left, col_w - 20, name="project_name")
    y_left = draw_field(
        c,
        page["fields"]["project_type"],
        left_x + 10,
        y_left,
        col_w - 20,
        name="project_type",
    )
    y_left = draw_field(c, page["fields"]["project_goal"], left_x + 10, y_left, col_w - 20, name="project_goal")
    y_left = draw_field(
        c,
        page["fields"]["project_budget"],
        left_x + 10,
        y_left,
        col_w - 20,
        name="project_budget",
    )
    draw_field(c, page["fields"]["project_date"], left_x + 10, y_left, col_w - 20, name="project_date")

    y_left = draw_card(c, left_x, content_top - 90 * mm, col_w, 54 * mm, page["cards"]["impact"])
    y_left = draw_paragraph(c, page["impact_hint"], left_x + 10, y_left, col_w - 20)
    draw_field(c, page["fields"]["impact_detail"], left_x + 10, y_left - 2, col_w - 20, name="project_objectives")

    y_right = draw_card(c, right_x, content_top, col_w, 86 * mm, page["cards"]["contact"])
    y_right = draw_field(c, page["fields"]["contact_name_role"], right_x + 10, y_right, col_w - 20, name="contact_name_role")
    y_right = draw_field(c, page["fields"]["contact_email"], right_x + 10, y_right, col_w - 20, name="contact_email")
    y_right = draw_field(c, page["fields"]["contact_phone"], right_x + 10, y_right, col_w - 20, name="contact_phone")
    y_right = draw_field(c, page["fields"]["contact_company"], right_x + 10, y_right, col_w - 20, name="contact_company")
    draw_field(c, page["fields"]["contact_location"], right_x + 10, y_right, col_w - 20, name="contact_location")

    y_right = draw_card(c, right_x, content_top - 90 * mm, col_w, 54 * mm, page["cards"]["audience"])
    y_check = y_right
    audience_names = [
        "audience_b2b",
        "audience_b2c",
        "audience_interne",
        "audience_international",
        "audience_communaute",
    ]
    for label, name in zip(page["audience_labels"], audience_names):
        y_check = draw_checkbox(c, label, right_x + 10, y_check, col_w - 20, name=name)

    full_width = PAGE_W - 2 * MARGIN
    y_full = draw_card(c, MARGIN, content_top - 150 * mm, full_width, 52 * mm, page["cards"]["features"])
    left_block_x = MARGIN + 10
    right_block_x = MARGIN + full_width / 2 + 10
    y_block = y_full
    feature_left_names = ["feature_landing", "feature_catalog", "feature_mvp", "feature_dashboard"]
    for label, name in zip(page["features_left"], feature_left_names):
        y_block = draw_checkbox(c, label, left_block_x, y_block, full_width / 2 - 20, name=name)
    y_block = y_full
    feature_right_names = ["feature_payment", "feature_automations", "feature_cms", "feature_multilingue"]
    for label, name in zip(page["features_right"], feature_right_names):
        y_block = draw_checkbox(c, label, right_block_x, y_block, full_width / 2 - 20, name=name)

    draw_footer(c, copy)


def build_page_two(c: canvas.Canvas, copy: dict) -> None:
    page = copy["page2"]
    c.showPage()
    draw_header(c, 2, TOTAL_PAGES, copy)
    draw_title(c, page["title"], page["subtitle"])

    content_top = PAGE_H - 66 * mm
    full_width = PAGE_W - 2 * MARGIN

    y_design = draw_card(c, MARGIN, content_top, full_width, 60 * mm, page["cards"]["design"])
    y_design = draw_paragraph(c, page["design_hint"], MARGIN + 10, y_design, full_width - 20)
    y_design = draw_field(
        c,
        page["fields"]["design_references"],
        MARGIN + 10,
        y_design - 6,
        full_width - 20,
        name="design_references",
    )
    draw_field(c, page["fields"]["design_content"], MARGIN + 10, y_design, full_width - 20, name="design_content")

    y_tech = draw_card(c, MARGIN, content_top - 68 * mm, full_width, 62 * mm, page["cards"]["integrations"])
    left_block_x = MARGIN + 10
    right_block_x = MARGIN + full_width / 2 + 10
    y_block = y_tech
    integration_left_names = ["integration_payment", "integration_crm", "integration_analytics", "integration_emailing"]
    for label, name in zip(page["integrations_left"], integration_left_names):
        y_block = draw_checkbox(c, label, left_block_x, y_block, full_width / 2 - 20, name=name)
    y_block = y_tech
    integration_right_names = ["integration_cms", "integration_api", "integration_auth", "integration_automations"]
    for label, name in zip(page["integrations_right"], integration_right_names):
        y_block = draw_checkbox(c, label, right_block_x, y_block, full_width / 2 - 20, name=name)

    y_pages = draw_card(c, MARGIN, content_top - 140 * mm, full_width, 52 * mm, page["cards"]["pages"])
    y_pages = draw_field(c, page["fields"]["pages_primary"], MARGIN + 10, y_pages, full_width - 20, name="pages_primary")
    draw_field(c, page["fields"]["pages_secondary"], MARGIN + 10, y_pages, full_width - 20, name="pages_secondary")

    draw_footer(c, copy)


def build_page_three(c: canvas.Canvas, copy: dict) -> None:
    page = copy["page3"]
    c.showPage()
    draw_header(c, 3, TOTAL_PAGES, copy)
    draw_title(c, page["title"], page["subtitle"])

    content_top = PAGE_H - 66 * mm
    full_width = PAGE_W - 2 * MARGIN

    y_plan = draw_card(c, MARGIN, content_top, full_width, 96 * mm, page["cards"]["planning"])
    set_font(c, 8, MUTED_COLOR)
    c.drawRightString(MARGIN + full_width - 10, y_plan, page["planning_target"])
    y_row = y_plan - 12
    planning_fields = ["plan_kickoff", "plan_design", "plan_dev", "plan_delivery"]
    for label, field_name in zip(page["planning_rows"], planning_fields):
        y_row = draw_table_row(c, MARGIN + 10, y_row, full_width - 20, label, field_name=field_name)

    y_sign = draw_card(c, MARGIN, content_top - 114 * mm, full_width, 56 * mm, page["cards"]["signature"])
    left_y = y_sign
    left_y = draw_field(
        c,
        page["fields"]["sign_client_name"],
        MARGIN + 10,
        left_y,
        full_width / 2 - 20,
        name="sign_client_name",
    )
    draw_field(
        c,
        page["fields"]["sign_client"],
        MARGIN + 10,
        left_y,
        full_width / 2 - 20,
        name="sign_client",
        height=45,
    )
    right_y = y_sign
    right_y = draw_field(
        c,
        page["fields"]["sign_kd_name"],
        MARGIN + full_width / 2 + 10,
        right_y,
        full_width / 2 - 20,
        name="sign_kd_name",
    )
    draw_field(
        c,
        page["fields"]["sign_kd"],
        MARGIN + full_width / 2 + 10,
        right_y,
        full_width / 2 - 20,
        name="sign_kd",
        height=45,
    )

    set_font(c, 8, MUTED_COLOR)
    c.drawString(MARGIN, 30 * mm, page["terms_note"])
    draw_footer(c, copy)


def build_page_four(c: canvas.Canvas, copy: dict, guide_items: list[dict]) -> None:
    page = copy["page4"]
    c.showPage()
    draw_header(c, 4, TOTAL_PAGES, copy)
    draw_title(c, page["title"], page["subtitle"])

    content_top = PAGE_H - 66 * mm
    card_height = 30 * mm
    y = content_top
    for item in guide_items:
        y = draw_ai_card(c, MARGIN, y, PAGE_W - 2 * MARGIN, card_height, item)

    draw_footer(c, copy)


def build_document(output_path: Path, copy: dict, guide_items: list[dict]) -> None:
    c = canvas.Canvas(str(output_path), pagesize=A4)
    build_page_one(c, copy)
    build_page_two(c, copy)
    build_page_three(c, copy)
    build_page_four(c, copy, guide_items)
    c.save()


def main() -> None:
    global ACTIVE_FONT
    ACTIVE_FONT = register_font()
    build_document(OUTPUT_PATH, COPY_FR, AI_GUIDE_ITEMS_FR)
    build_document(OUTPUT_PATH_EN, COPY_EN, AI_GUIDE_ITEMS_EN)


PAGE_W, PAGE_H = A4
MARGIN = 20 * mm
GUTTER = 8 * mm
ACTIVE_FONT = FALLBACK_FONT


if __name__ == "__main__":
    main()
