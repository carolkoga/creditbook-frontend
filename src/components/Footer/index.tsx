import Image from 'next/image';
import Link from 'next/link';
import { FooterStyle } from './styled';

export default function Footer() {
  return (
    <FooterStyle>
      <div className="left-content">
        <Link legacyBehavior href="/">
          <a>
            <Image
              src="/assets/images/logo_creditbook.svg"
              width="256"
              height="50"
              alt="Logo"
              layout="fixed"
            />
          </a>
        </Link>

        <small>
          <Image
            src="/assets/icons/phone.svg"
            width="20"
            height="20"
            alt="Telefone para contato"
            layout="fixed"
          />
          (11) 2737-1888
        </small>

        <small
          style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'left',
            flexDirection: 'row',
            marginBottom: '-12px',
          }}
        >
          <Image
            src="/assets/icons/map-pin.svg"
            width="20"
            height="20"
            alt="Endereço da sede"
            layout="fixed"
          />
          <p style={{ textAlign: 'left' }}>
            Alameda Santos, 1470 - 9º andar, Jardim Paulista - SP
          </p>
        </small>

        <ul className="networking__media">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/creditbookoficial/"
            >
              <Image
                src="/assets/icons/networking-media/vector_instagram.svg"
                width="40"
                height="40"
                alt="Creditbook Instagram"
                layout="fixed"
              />
            </a>
          </li>

          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/creditbookoficial/"
            >
              <Image
                src="/assets/icons/networking-media/vector_facebook.svg"
                width="40"
                height="40"
                alt="Creditbook Facebook"
                layout="fixed"
              />
            </a>
          </li>

          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/company/creditbook-oficial/about/"
            >
              <Image
                src="/assets/icons/networking-media/vector_linkedin.svg"
                width="40"
                height="40"
                alt="Creditbook Linkedin"
                layout="fixed"
              />
            </a>
          </li>
        </ul>
      </div>

      <div className="right-content">
        <small>
          © {new Date().getFullYear()} Creditbook. All rights reserved.
        </small>

        <small>Ajude-nos a evoluir!</small>

        <small>
          <Link legacyBehavior href="/contact">
            <a className="button">Dar Feedback</a>
          </Link>
        </small>
      </div>
    </FooterStyle>
  );
}
