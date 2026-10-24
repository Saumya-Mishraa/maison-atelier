// Every photograph is used exactly once. Swap an id here to change an image site-wide.
// Ids are Unsplash photo ids (free licence); the helper below builds the delivery URL.
export const photoUrl = (id, w = 900) =>
  `https://unsplash.com/photos/${id}/download?force=true&w=${w}`;

export const FREE_SHIPPING_AT = 150;

export const CATEGORIES = ['All pieces', 'Outerwear', 'Tailoring', 'Knitwear', 'Essentials'];

export const SWATCH = {
  Sand: '#c8b392',
  Ivory: '#efe9dc',
  Stone: '#a8a294',
  Oatmeal: '#d6cbb4',
  Chalk: '#f4f1ea',
  Pewter: '#85867f',
  Flax: '#cdbf9c',
  Fawn: '#b99f7e',
};

export const products = [
  { id: 1, name: 'The Everyday Trench', category: 'Outerwear', price: 189, color: 'Sand', tag: 'Best seller', photo: 'Qy8IEssqkYU', pos: '50% 20%' },
  { id: 2, name: 'Soft Structure Shirt', category: 'Essentials', price: 89, color: 'Ivory', tag: 'New in', photo: 'iuLuw4iAeXo', pos: '50% 25%' },
  { id: 3, name: 'The Form Trouser', category: 'Tailoring', price: 129, color: 'Stone', tag: '', photo: 'HlVjI5WmoQY', pos: '50% 40%' },
  { id: 4, name: 'Weekend Knit', category: 'Knitwear', price: 115, color: 'Oatmeal', tag: 'Limited', photo: 'A_hPa0Dcgpw', pos: '50% 30%' },
  { id: 5, name: 'Winter White Coat', category: 'Outerwear', price: 295, color: 'Chalk', tag: '', photo: 'PrSrUW9aQCI', pos: '50% 25%' },
  { id: 6, name: 'Ribbed Merino Crew', category: 'Knitwear', price: 135, color: 'Pewter', tag: '', photo: 'mU88MlEFcoU', pos: '50% 30%' },
  { id: 7, name: 'Linen Day Set', category: 'Essentials', price: 169, color: 'Flax', tag: 'New in', photo: 'EFCmSAeIT8E', pos: '50% 30%' },
  { id: 8, name: 'Soft Tailored Suit', category: 'Tailoring', price: 245, color: 'Fawn', tag: '', photo: 'h8fJcfaARJg', pos: '50% 20%' },
];

export const images = {
  hero: { id: '2O2cXJemDmo', alt: 'A woman in a long beige coat standing on stone steps in daylight', pos: '50% 30%' },
  heroDetail: { id: 'U7PWtm0vdqE', alt: 'Close detail of a light beige textured fabric with a grid weave', pos: '50% 50%' },
  story: { id: 'UpL2_sNSgHg', alt: 'A woman in a white shirt and white trousers standing beside a brown wall', pos: '50% 30%' },
  storyDetail: { id: 'xTaOPMa6wAE', alt: 'Beige linen fabric texture', pos: '50% 50%' },
};

export const journal = [
  {
    id: 'a',
    photo: '6tSNTAlJxDA',
    alt: 'A woman and a man in light shirts walking through a doorway',
    pos: '50% 35%',
    kind: 'Style notes',
    read: '4 min read',
    title: 'The five-piece reset',
    dek: 'What stays when you clear a rail: a trench, a white shirt, one good trouser, a knit, a coat.',
  },
  {
    id: 'b',
    photo: 'woQT52vbwOU',
    alt: 'A blurred woman walking outdoors past trees and a wall',
    pos: '50% 40%',
    kind: 'In good company',
    read: '6 min read',
    title: 'Finding your uniform',
    dek: 'Notes on dressing the same way, on purpose.',
  },
  {
    id: 'c',
    photo: '3GwOfh-VMgQ',
    alt: 'White textile folded on a brown wooden table',
    pos: '50% 50%',
    kind: 'Care guide',
    read: '3 min read',
    title: 'Care is part of the design',
    dek: 'Washing, airing and mending natural fibres.',
  },
];
