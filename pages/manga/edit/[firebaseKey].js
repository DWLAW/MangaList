import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleManga } from '../../../api/mangaData';
import MangaForm from '../../../components/Forms/MangaForm';

export default function Editmanga() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleManga(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<MangaForm obj={editItem} />);
}
