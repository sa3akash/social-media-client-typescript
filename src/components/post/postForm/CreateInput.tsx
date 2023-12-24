
const CreateInput = () => {
    const image = true;
  return (
    <div className="mt-4">
      {!image && <div
        contentEditable={true}
        data-placeholder="What's on your mind?"
        className="w-full text-[24px] border-none outline-none max-h-[400px] h-[80px] overflow-y-scroll overflow-x-hidden break-all"
      />}
      {image && <div
        contentEditable={true}
        data-placeholder="What's on your mind?"
        className="w-full text-[24px] border-none outline-none max-h-[400px] h-[80px] overflow-y-scroll overflow-x-hidden break-all"
      />}
    </div>
  );
};

export default CreateInput;
