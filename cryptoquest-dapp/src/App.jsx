import { useState } from 'react';

function App() {

  // Image URLs
  const image1Url = 'https://cf-ipfs.com/ipfs/bafybeicoyjrvm4nnhm4zsbtv5kyhlbi4coiwxboikc7jvsucunlzngrxem';  
  const image2Url = 'https://cf-ipfs.com/ipfs/bafybeidcbrabguyijjacv672yyq4j2juyf5s62hz6v2edinzm3kzltnbxy';
  const image3Url = 'https://cf-ipfs.com/ipfs/bafybeiaryl6kl3yqxh4zellkwnzw7hq74ftxavwoiejgbacasgs3swahwa';

  // Current image state
  const [currentImage, setCurrentImage] = useState(1);

  return (
    <div>

      {/* Image component */}
      <Image 
        url={getUrl()}
      />

      {/* Navigation */}
      <Navigation />

      {/* Footer */}
      <Footer />

    </div>
  );

  // Conditionally return image URL
  function getUrl() {
    if(currentImage === 1) return image1Url;
    if(currentImage === 2) return image2Url;
    return image3Url;
  }

}

// Image component
function Image({url}) {
  return <img src={url} />
}

// Navigation buttons  
function Navigation() {
  return (
    <>
      <Button 
        handleClick={() => setCurrentImage(1)}  
      >
        Image 1  
      </Button>

      <Button
        handleClick={() => setCurrentImage(2)} 
      >
        Image 2  
      </Button>

      <Button 
        handleClick={() => setCurrentImage(3)}
      >
        Image 3
      </Button>
    </>
  );
}

// Reusable button
function Button({children, handleClick}) {
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

// Footer content
function Footer() {
  return (
    <p>Copyright 2023</p>
  );
}

export default App;