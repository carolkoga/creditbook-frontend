import Image from 'next/image';
import Link from 'next/link';
import { FooterStyle } from './styled';

export default function Footer() {
  return (
    <FooterStyle>
      <div className="left-content">
        <Link href="/">
          <a>
            <Image src="/assets/images/logo.svg" width="137px" height="50px" alt="Logo" layout="fixed" />
          </a>
        </Link>

        <ul className="networking__media">
          <li>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/creditbookoficial/">
              <Image src="/assets/icons/networking-media/instagram.svg" width="32px" height="32px" alt="Creditbook Instagram" layout="fixed" />
            </a>
          </li>

          <li>
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/creditbookoficial/">
              <Image src="/assets/icons/networking-media/facebook.svg" width="32px" height="32px" alt="Creditbook Facebook" layout="fixed" />
            </a>
          </li>

          <li>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/creditbook-oficial/about/">
              <Image src="/assets/icons/networking-media/linkedin.svg" width="32px" height="32px" alt="Creditbook Linkedin" layout="fixed" />
            </a>
          </li>
        </ul>
      </div>

      <div className="right-content">
        <small>
          Ajude-nos a evoluir!
          <Link href="/contact">
            <a className="button">
              Dar Feedback
            </a>
          </Link>
        </small>

        <small>
          <Image src="/assets/icons/phone.svg" width="20px" height="20px" alt="Telefone para contato" layout="fixed" />
          (11) 2737-1888
        </small>

        <small>
          <Image src="/assets/icons/map-pin.svg" width="20px" height="20px" alt="Endereço da sede" layout="fixed" />
          Alameda Santos, 1470 - 9º andar, Jardim Paulista - SP
        </small>

        <small>
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          Creditbook. All rights reserved.
        </small>
      </div>
    </FooterStyle>
  );
}
