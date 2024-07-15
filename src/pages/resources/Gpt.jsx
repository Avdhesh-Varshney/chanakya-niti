import Card from '../../components/shared/Card';

const Gpt = () => {
  return (
    <div>
      <Card 
        imgSrc="/image.webp" 
        title="Chanakya Niti" 
        description="Ask questions that you might ask to chanakya" 
        path="/resources/chanakyagpt/chanakya" 
        btnName="Ask your questions" 
      />
    </div>
  )
}

export default Gpt;
