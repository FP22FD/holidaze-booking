import { Link } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok, IoHeart } from 'react-icons/io5';

function Footer() {
  return (
    <footer
      className="row-start-3 col-span-12 max-h-[100px} overflow-y-auto"
      role="contentinfo"
      aria-label="Footer section"
    >
      <div className="bg-primary-dark-blue flex flex-col items-center text-background-default">
        <nav aria-label="Social media links">
          <div className="flex pt-9 space-x-6">
            <div className="bg-background-default rounded-full p-1 ">
              <Link
                className="duration-300 ease-in hover:scale-125"
                to="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
              >
                <IoLogoFacebook className="w-6 h-6 text-primary-dark-blue" aria-hidden="true" />
              </Link>
            </div>

            <div className="bg-background-default rounded-full p-1 ">
              <Link
                className="duration-300 ease-in hover:scale-125"
                to="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram profile"
              >
                <IoLogoInstagram className="w-6 h-6 text-primary-dark-blue" aria-hidden="true" />
              </Link>
            </div>
            <div className="bg-background-default rounded-full p-1 ">
              <Link
                className="duration-300 ease-in hover:scale-125"
                to="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our TikTok page"
              >
                <IoLogoTiktok className="w-6 h-6 text-primary-dark-blue" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-center p-4 text-center text-xs font-semibold">
          <p className="mb-1">&copy; 2024 Holidaze Booking. All Rights Reserved</p>
          <p>
            Made with <IoHeart className="inline text-status-error-red" aria-label="heart icon" />
            <span className="ml-1">by Fernanda Gomes</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
