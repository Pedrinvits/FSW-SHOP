"use client"
import { Frown, HomeIcon } from 'lucide-react';
import Link from 'next/dist/client/link';
import { Button } from './button';
const NotFoundPage = () => {
  return (
    <section className="mx-auto flex items-center py-8 container gap-10 mt-8 rounded-lg border-primary border-2 w-fit">
        <h1 className='text-xl font-bold lg:text-3xl flex justify-center gap-4 items-center'> <Frown/> Página não encontrada !</h1>
            <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Voltar para home
                </Button>
            </Link>
    </section>
  );
};

export default NotFoundPage;