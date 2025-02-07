import { Button } from "@/components/ui/button";
import { CartItem, Product } from "@/types";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "./cart-context";
import { Eye, Key, Mail, Minus, Phone, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useSignIn } from "@/features/auth/apis/use-sign-in";
import { useSignUp } from "@/features/auth/apis/use-sign-up";
import { SignUpInput } from "@/features/auth/schemas/sign-up";

export default function Header({data}:{data:Product[]|undefined}){
    const [isSignIn, setIsSignIn] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [isOpenCartMenu, setIsOpenCartMenu] = useState(false);
    const {totalPrice} = useCart()
    const router = useRouter();
    const handleHomeClick = () => {
        if (window.location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.location.reload();
          } else {
            router.push("/");
        }
    };
   
    useEffect(()=>{
      if (localStorage.getItem("isSignIn")==="true"){
      setIsSignIn(true);
      }
    }, [isSignIn])

    const handleProfileClick = () => {
      router.push("/account");
    }

    const handleLogout=()=>{
      setIsSignIn(false);
      localStorage.removeItem("isSignIn");
      router.push("/");
      window.location.reload();
    }

    return(
        <div>
          <header className="flex gap-4 justify-between items-center pl-8 pt-1 pb-1 pr-8 sticky">
            <Image
            className=""
            src="/favicon.ico"
            width={56}    
            height={63}
            alt="Ảnh trang web"
            />
            <div className="flex gap-2">
                <h1 className="text-lg hover:text-blue-500 border-b-2 border-white hover:border-blue-500 cursor-pointer transition-all duration-300 p-2"
                    onClick={handleHomeClick}
                >Home</h1>
                <h1 className="text-lg hover:text-blue-500 border-b-2 border-white hover:border-blue-500 cursor-pointer transition-all duration-300 p-2">Products</h1>
                <h1 className="text-lg hover:text-blue-500 border-b-2 border-white hover:border-blue-500 cursor-pointer transition-all duration-300 p-2">FAQ</h1>
                <h1 className="text-lg hover:text-blue-500 border-b-2 border-white hover:border-blue-500 cursor-pointer transition-all duration-300 p-2">Contact Us</h1>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Image
              src="/search.png"
              alt="Icon tìm kiếm"
              width={30}
              height={30}
              className="hover:cursor-pointer"
              onClick={()=>setIsOpenSearch(true)}
              />
                {
                  isSignIn?
                  (
                  <div className="flex flex-row">
                      <div className="relative">
                        <Image
                          src="/basket.png"
                          alt="Icon giỏ hàng"
                          width={30}
                          height={30}
                          className="hover:cursor-pointer"
                          onClick={()=>setIsOpenCartMenu(true)}
                          />
                        <p className="absolute text-blue-600 top-0 right-0 text-xs bg-white w-fit">
                          {totalPrice}
                        </p>
                      </div>
                      <Image
                      src="/profile.png"
                      alt="Icon profile"
                      width={30}
                      height={30}
                      className="hover:cursor-pointer"
                      onClick={()=>setMenuVisible(true)}
                      />
                  </div>
                  ):
                  (
                  <div className="flex gap-1">
                      {/* <Button className="bg-green-400" onClick={()=>setIsOpenSignUp(true)}>Sign up</Button> */}
                      <Button className="bg-blue-400" onClick={()=>setIsOpenSignIn(true)}>Sign in</Button>
                  </div>
                  )
                }
            </div>
            </header>
            <hr className="pl-8 pt-1 pb-1 pr-8 w-full"/>
            {isMenuVisible && (
            <div className="absolute top-[64px] right-8 w-fit bg-white shadow-lg z-50 rounded-md">
            <div className="p-4"
            >
                <ul>
                <li className="flex gap-2 hover:cursor-pointer"
                  onClick={handleProfileClick}
                >
                  <Image
                    src='/profile.png'
                    alt="Profile"
                    width={24}
                    height={24}
                    className="border-2 border-blue-900 rounded-full bg-blue-200"
                  />
                  Jimmy Smith
                </li>
                <li className="hover:cursor-pointer">Orders</li>
                <li className="hover:cursor-pointer">Wish List</li>
                <li className="hover:cursor-pointer">Payments</li>
                <li className="hover:cursor-pointer"
                  onClick={handleLogout}
                >Log out</li>
                </ul>
            </div>
          </div>
          )}
          {isMenuVisible && (
              <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setMenuVisible(false)} // Tắt menu khi click vào nền
              ></div>
          )}
          {isOpenCartMenu && (
              <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setIsOpenCartMenu(false)} // Tắt menu khi click vào nền
              ></div>
          )}
          <div>
              {isOpenSearch &&
              <SearchBarComponent products={data} onClose={()=>setIsOpenSearch(false)}/>
              }
              {isOpenSignIn&&<SignInComponent onClose={()=>setIsOpenSignIn(false)} onOpenProfile={()=>setIsSignIn(true)}/>}
              <div className="category items-center justify-between">
              </div>
          </div>
          <>
              {isOpenCartMenu && <CartMenu onClose={()=>setIsOpenCartMenu(false)}/>}
          </>
      </div>
    )
}

const SignInComponent =({onClose, onOpenProfile}:{onClose:()=>void, onOpenProfile:()=>void})=>{
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  if (!showSignUpForm) return;
  const[email, setEmail]= useState('')
  const[password, setPassword]= useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const router = useRouter();
  const [active, setActive] = useState(1);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [dataSignUp, setDataSignUp] = useState<SignUpInput>({
    email: '',
    password: '',
    phoneNumber: '',
    name: '',
  });

  const { mutate: signIn, isSuccess, mutateAsync } = useSignIn();
  const handleSubmit = async (e:any)=>{
    await mutateAsync({ email, password }); // Không cần await nếu signIn là đồng bộ
    if (isSuccess) {
      onOpenProfile();
      router.push('/');
    }
  }

  const {mutate:signUp} = useSignUp()
  const handleSignUp = async (e:any)=>{
    signUp({email, password, phoneNumber, name})
    if (isSuccess){
      setActive(1)
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail&&password) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  return(
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-fit lg:w-1/4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between relative">
            <p className=
            {
              `pl-4 pr-4 border-b-2 z-10 border-transparent transition-all duration-300
              ${
                active === 1? 'border-blue-400 text-blue-600' : ''
              }`
            }
            onClick={()=>setActive(1)}
            >Log In</p>
            <p className={
              `pl-4 pr-4 border-b-2 z-10 border-transparent transition-all duration-3004
              ${
                active === Number(2)? 'border-blue-400 text-blue-600' : ''
              }`
            }
              onClick={()=>setActive(2)}
            >Create Account</p>
            <div className="absolute bottom-0 w-full border-b-2 border-gray-300"></div>
          </div>
          
          {active===1?
            <>
              <h3 className="mt-1 mb-4 text-center font-bold text-2xl">Log in to Tech Heim</h3>
              <div className="relative w-full max-w-xs">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="username"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Mail
                    strokeWidth={2}
                    size={18}
                  />
                </div>
              </div>
              <div className="mt-1 relative w-full max-w-xs">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="current-password"
                  onChange={(event)=>setPassword(event.target.value)}
                  value={password}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Key
                    strokeWidth={2}
                    size={18}
                  />
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Eye
                    strokeWidth={2}
                    size={18}
                    color="gray"
                  />
                </div>
              </div>
              <div className="text-xs text-blue-600 flex justify-end hover:cursor-pointer" >Forgot Password ?</div>
              {/* <div className="flex mt-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={()=>setRememberMe(!rememberMe)}
                />
                <p className="ml-1">Keep me logged in</p>
              </div> */}
              <Button 
                onClick={(e)=>handleSubmit(e)}
                className="bg-blue-600 w-full mt-6">Log In</Button>
            </>:
            <>
              <h3 className="mt-1 mb-4 text-center font-bold text-2xl">Create Account</h3>
              <div className="relative w-full max-w-xs">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Mail
                    strokeWidth={2}
                    size={18}
                  />
                </div>
              </div>
              <div className="mt-1 relative w-full max-w-xs">
                <input
                  type={`${showPassword?"text":"password"}`}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(event)=>setPassword(event.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Key
                    strokeWidth={2}
                    size={18}
                  />
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Eye
                    strokeWidth={2}
                    size={18}
                    color={`${showPassword?"gray":"blue"}`}
                    onClick={()=>setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <div className="relative w-full max-w-xs mt-1">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Phone
                    strokeWidth={2}
                    size={18}
                  />
                </div>
              </div>
              <div className="relative w-full max-w-xs mt-1">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setName(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Mail
                    strokeWidth={2}
                    size={18}
                  />
                </div>
              </div>
              <Button 
                onClick={(e)=>handleSignUp(e)}
                className="bg-blue-600 w-full mt-6">Create</Button>
            </>
          }
        </div>
      </div>
  )
}

const SearchBarComponent=({products, onClose}:{products: Product[]|undefined; onClose:()=>void})=>{
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products?.filter((product:any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const router = useRouter();
  return(
          <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={onClose}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-fit relative"
              onClick={(e) => e.stopPropagation()}
              >
                <X
                  className="absolute top-6 right-6 hover:cursor-pointer"
                  onClick={onClose}
                />
              <h2 className="text-lg font-bold mb-2">Search Products</h2>
              <input
                type="text"
                placeholder="What can we help you to find?"
                className="mb-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
              <h3 className="text-gray-400">view {filteredProducts?.length} results</h3>
              <hr/>
              <div className="grid w-full max-h-[500px] items-center sm:grid-cols-3 md:grid-cols-3 justify-center
                overflow-y-auto scroll-bar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              >
                {filteredProducts?.map((product)=>{
                  return(
                    <div 
                      key={product.id} 
                      className="py-2 px-2 hover:text-blue-500 hover:bg-gray-100 flex flex-col justify-center
                      shadow-md hover:cursor-pointer mx-2 mt-2"
                      onClick={()=>router.push(`/product/${product.id}`)}
                    >
                      <div className="flex justify-center mb-2">
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/${product.images[0].image}`}
                          width={100}
                          height={100}
                          alt={product.name}
                        />
                      </div>
                      <div className="flex flex-col pl-2">
                        <p className="font-semibold">{product.name}</p>
                        <p>${formatCurrency(product.price)}</p>
                      </div>
                    </div>
                  )
                })}
                {/* </div>
                <div className="items-center justify-between flex flex-col">
                  <Image 
                  src={"/product.png"}
                  width={200}
                  height={10}
                  alt="Product-Search"
                  />
                  <p>name</p>
                </div> */}
              </div>
            </div>
          </div>
        )
}

const CartMenu = ({onClose}:{onClose:()=>void})=>{
  const { cart, removeFromCart, totalPrice, totalPriceProducts, increaseQuantity, decreaseQuantity } = useCart();
  return(
    <div 
      className="absolute top-[64px] right-8 w-fit bg-white shadow-lg z-50 rounded-md"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-fit relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl\">{totalPrice} items</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No products in cart</p>
        ) : (
        <>
          <ul className="max-h-96 overflow-y-auto scroll-bar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {cart.map((item:CartItem) => (
              <li 
                key={item.id} 
                className="flex justify-between items-center py-2
                hover:text-blue-500 hover:bg-gray-100
                p-2 rounded shadow-xl mt-2 mx-2"
              >
                <div className="flex items-center">
                  <Image
                    src={item.images[0].image}
                    width={100}
                    height={100}
                    alt={item.name}/>
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <div className="flex justify-between mt-4">
                      <p className="text-sm">${formatCurrency(item.price)}</p>
                      <div className="flex gap-2 ml-10">
                        <Trash2
                          className="text-red-500 ml-4 size-5 hover:cursor-pointer"
                          onClick={() => removeFromCart(item.id)}
                        />
                        <div className="flex gap-1 items-center">
                          <Minus 
                            className="rounded-2xl text-black hover:bg-red-400"
                            onClick={()=>decreaseQuantity(item.id)}
                          >-</Minus>
                          <span>{item.quantity}</span>
                          <Plus 
                            className="rounded-2xl text-black hover:bg-blue-400"
                            onClick={()=>increaseQuantity(item.id)}
                          >+</Plus>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Button
            className="bg-blue-600 px-4 py-2 mt-4 w-full flex"
          >
            Proceed to Cart
            <ShoppingCart className="ml-2" />
          </Button>
        </>
        )}
      </div>
    </div>
  )
}

const formatCurrency = (amount:number) => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};