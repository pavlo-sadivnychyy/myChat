import { useEffect, useState } from 'react';

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
    <img src={imageSrc} alt={fileName} />
  )


}
export default Image
