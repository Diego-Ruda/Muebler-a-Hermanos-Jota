import aparadorImage from '../assets/products/aparador-uspallata.png';
import bibliotecaImage from '../assets/products/biblioteca-recoleta.png';
import butacaImage from '../assets/products/butaca-mendoza.png';
import escritorioImage from '../assets/products/escritorio-costa.png';
import mesaComedorImage from '../assets/products/mesa-comedor-pampa.png';
import mesaCentroImage from '../assets/products/mesa-centro-araucaria.png';
import mesaNocheImage from '../assets/products/mesa-noche-aconcagua.png';
import sillaTrabajoImage from '../assets/products/silla-trabajo-belgrano.png';
import sillasImage from '../assets/products/sillas-cordoba.png';
import sillonImage from '../assets/products/sillon-copacabana.png';
import sofaImage from '../assets/products/sofa-patagonia.png';

const products = [
  {
    id: 1,
    title: 'Aparador Uspallata',
    price: 850000,
    image: aparadorImage,
    description: 'Nogal sostenible y tiradores metálicos en acabado latón.',
    featured: true,
  },
  {
    id: 2,
    title: 'Biblioteca Recoleta',
    price: 620000,
    image: bibliotecaImage,
    description: 'Estantes de roble claro con estructura de acero verde.',
    featured: false,
  },
  {
    id: 3,
    title: 'Butaca Mendoza',
    price: 410000,
    image: butacaImage,
    description: 'Tapizado bouclé y base de madera de guatambú.',
    featured: true,
  },
  {
    id: 4,
    title: 'Sillón Copacabana',
    price: 590000,
    image: sillonImage,
    description: 'Cuero cognac y base giratoria de acero.',
    featured: false,
  },
  {
    id: 5,
    title: 'Mesa de Centro Araucaria',
    price: 340000,
    image: mesaCentroImage,
    description: 'Mármol Patagonia con base de tres patas en nogal.',
    featured: true,
  },
  {
    id: 6,
    title: 'Mesa de Noche Aconcagua',
    price: 210000,
    image: mesaNocheImage,
    description: 'Roble certificado, cajón oculto y repisa inferior.',
    featured: false,
  },
  {
    id: 7,
    title: 'Sofá Patagonia',
    price: 980000,
    image: sofaImage,
    description: 'Tres cuerpos en lino con patas cónicas de madera.',
    featured: true,
  },
  {
    id: 8,
    title: 'Mesa Comedor Pampa',
    price: 750000,
    image: mesaComedorImage,
    description: 'Roble macizo extensible para reuniones de hasta diez personas.',
    featured: false,
  },
  {
    id: 9,
    title: 'Sillas Córdoba',
    price: 380000,
    image: sillasImage,
    description: 'Set de cuatro sillas apilables en nogal y acero.',
    featured: false,
  },
  {
    id: 10,
    title: 'Escritorio Costa',
    price: 290000,
    image: escritorioImage,
    description: 'Bambú laminado, cajón organizador y pasacables integrado.',
    featured: false,
  },
  {
    id: 11,
    title: 'Silla de Trabajo Belgrano',
    price: 320000,
    image: sillaTrabajoImage,
    description: 'Silla regulable con respaldo de malla y soporte lumbar.',
    featured: false,
  },
];

export default products;