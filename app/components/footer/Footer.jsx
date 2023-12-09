import { Container } from "@/app/components/Container";
import { FooterList } from "./FooterList";
import Link from "next/link";

import { MdFacebook } from 'react-icons/md'
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube  } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href={"#"}>Phones</Link>
            <Link href={"#"}>Laptops</Link>
            <Link href={"#"}>Desktops</Link>
            <Link href={"#"}>Watches</Link>
            <Link href={"#"}>TVs</Link>
            <Link href={"#"}>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href={"#"}>Contact Us</Link>
            <Link href={"#"}>Shipping Policy</Link>
            <Link href={"#"}>Returns & Exchanges</Link>
            <Link href={"#"}>Watches</Link>
            <Link href={"#"}>FAQs</Link>
          </FooterList>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-base font-bold mb-2">About Us</h3>
              <p className="mb-2">
                At our electronics store, we are dedicated to providing the
                latest and greates devices and accessories to our customers.
                With a wide seleciton of phones, TVs latops, watches and
                accessories.
              </p>
              <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved</p>
            </div>
          <FooterList>
            <h3 className="text-base  font-bold mb-2">Follow Us</h3>
             <div className="flex flex-row gap-2">
              <Link href="#"></Link>
                <MdFacebook size={24}/>
                <AiFillTwitterCircle size={24}/>
                <AiFillInstagram size={24}/>
                <AiFillYoutube size={24}/>
              
             </div>

          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
