import { useEffect, useState } from 'react';
import img from '../img/file.png'

function Image({blob,fileName}) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function (){
      setImageSrc(reader.result.toString())
    }
  }, [blob])

  return (
    <img src={imageSrc ? imageSrc : img} alt={fileName} />
  )
}
export default Image
