const Menu = ({ positionX, positionY }) => {
  return (
    <div
      className="my-10"
      style={{
        position: "absolute",
        left: `${positionX}px`,
        top: `${positionY}px`,
        zIndex: 2
      }}
    >
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="border-b">
          <a href="/" className="px-4 py-2 hover:bg-gray-100 flex">
            <div className="text-gray-800">

            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Что-то1
              </p>
              <p className="text-xs text-gray-500">

              </p>
            </div>
          </a>
          <a href="/" className="px-4 py-2 hover:bg-gray-100 flex">
            <div className="text-gray-800">

            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Что-то2
              </p>
              <p className="text-xs text-gray-500"></p>
            </div>
          </a>
          <a href="/" className="px-4 py-2 hover:bg-gray-100 flex">
            <div className="text-gray-800">

            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Что-то3
              </p>
              <p className="text-xs text-gray-500"></p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
