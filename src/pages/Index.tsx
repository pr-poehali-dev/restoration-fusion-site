import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'wine';
  image?: string;
  volume?: string;
  region?: string;
  year?: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Трюфельное ризотто",
    description: "Ризотто арборио с черными трюфелями, пармезаном и белым вином",
    price: 2800,
    category: "main",
    image: "/img/5fc3dde0-d91d-4ad2-b0c9-9f55b66b75bc.jpg"
  },
  {
    id: 2,
    name: "Устрицы Белон",
    description: "Свежие устрицы с лимоном и мигнонетом",
    price: 450,
    category: "appetizer"
  },
  {
    id: 3,
    name: "Тирамису",
    description: "Классический итальянский десерт с маскарпоне",
    price: 890,
    category: "dessert"
  },
  {
    id: 4,
    name: "Барбареско DOCG",
    description: "Элегантное красное вино из Пьемонта",
    price: 8500,
    category: "wine",
    volume: "750мл",
    region: "Пьемонт",
    year: 2019
  },
  {
    id: 5,
    name: "Шардоне Шабли",
    description: "Минеральное белое вино с цитрусовыми нотами",
    price: 6200,
    category: "wine",
    volume: "750мл",
    region: "Бургундия",
    year: 2021
  }
];

function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<{item: MenuItem, quantity: number}[]>([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [paymentForm, setPaymentForm] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.item.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.item.id === item.id 
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem
      ));
    } else {
      setCart([...cart, {item, quantity: 1}]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(cartItem => 
        cartItem.item.id === itemId 
          ? {...cartItem, quantity: newQuantity}
          : cartItem
      ));
    }
  };

  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setCart([]);
      setTimeout(() => {
        setIsPaymentOpen(false);
        setPaymentStep('cart');
      }, 3000);
    }, 2000);
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const cartTotal = cart.reduce((total, cartItem) => 
    total + (cartItem.item.price * cartItem.quantity), 0
  );

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brown/95 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-playfair font-bold text-gold">
              Sole di Provenza
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-cream hover:text-gold transition-colors font-montserrat">Главная</a>
              <a href="#about" className="text-cream hover:text-gold transition-colors font-montserrat">О нас</a>
              <a href="#menu" className="text-cream hover:text-gold transition-colors font-montserrat">Меню</a>
              <a href="#reviews" className="text-cream hover:text-gold transition-colors font-montserrat">Отзывы</a>
              <a href="#contact" className="text-cream hover:text-gold transition-colors font-montserrat">Контакты</a>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-brown">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Корзина ({cart.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-playfair text-xl">
                      {paymentStep === 'cart' ? 'Ваш заказ' : 
                       paymentStep === 'payment' ? 'Оплата заказа' : 'Заказ оформлен!'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {paymentStep === 'cart' && (
                    <div className="space-y-4">
                      {cart.length === 0 ? (
                        <p className="text-muted-foreground">Корзина пуста</p>
                      ) : (
                        <>
                          <div className="max-h-60 overflow-y-auto space-y-3">
                            {cart.map(cartItem => (
                              <div key={cartItem.item.id} className="flex justify-between items-start p-3 bg-cream/20 rounded-lg">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{cartItem.item.name}</p>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {cartItem.item.price.toLocaleString()} ₽ за шт.
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Icon name="Minus" size={12} />
                                    </Button>
                                    <span className="text-sm font-medium w-8 text-center">{cartItem.quantity}</span>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Icon name="Plus" size={12} />
                                    </Button>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-semibold">
                                    {(cartItem.item.price * cartItem.quantity).toLocaleString()} ₽
                                  </p>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => removeFromCart(cartItem.item.id)}
                                    className="h-6 w-6 p-0 mt-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Icon name="Trash2" size={12} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-4">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Итого:</span>
                              <span>{cartTotal.toLocaleString()} ₽</span>
                            </div>
                            <Button 
                              className="w-full mt-4 bg-gold hover:bg-gold-dark text-brown"
                              onClick={() => setPaymentStep('payment')}
                            >
                              Перейти к оплате
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {paymentStep === 'payment' && (
                    <div className="space-y-4">
                      <div className="bg-cream/20 p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Товаров: {cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                          <span className="font-semibold">{cartTotal.toLocaleString()} ₽</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="payment-email">Email</Label>
                          <Input 
                            id="payment-email" 
                            type="email"
                            value={paymentForm.email}
                            onChange={(e) => setPaymentForm({...paymentForm, email: e.target.value})}
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardholder-name">Имя владельца карты</Label>
                          <Input 
                            id="cardholder-name" 
                            value={paymentForm.cardholderName}
                            onChange={(e) => setPaymentForm({...paymentForm, cardholderName: e.target.value})}
                            placeholder="IVAN PETROV"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="card-number">Номер карты</Label>
                          <Input 
                            id="card-number" 
                            value={paymentForm.cardNumber}
                            onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="expiry-date">Срок действия</Label>
                            <Input 
                              id="expiry-date" 
                              value={paymentForm.expiryDate}
                              onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              value={paymentForm.cvv}
                              onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                              placeholder="123"
                              maxLength={3}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setPaymentStep('cart')}
                          className="flex-1"
                        >
                          Назад
                        </Button>
                        <Button 
                          className="flex-1 bg-gold hover:bg-gold-dark text-brown"
                          onClick={processPayment}
                        >
                          <Icon name="CreditCard" size={16} className="mr-2" />
                          Оплатить {cartTotal.toLocaleString()} ₽
                        </Button>
                      </div>
                    </div>
                  )}

                  {paymentStep === 'success' && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="Check" size={32} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-700">Оплата прошла успешно!</h3>
                        <p className="text-muted-foreground mt-2">
                          Ваш заказ принят в обработку. Мы свяжемся с вами в ближайшее время.
                        </p>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/img/ebaf6ed6-c301-4055-8cb8-f52f75ab0599.jpg)',
            filter: 'brightness(0.6)'
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-6 animate-fade-in">
            Sole di Provenza
          </h1>
          <p className="text-xl md:text-2xl font-cormorant mb-8 animate-fade-in opacity-90">
            Фьюжн-кухня высокого уровня с винными дегустациями от сомелье
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-brown font-montserrat font-semibold px-8 py-4">
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Забронировать стол
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-playfair text-xl">Бронирование стола</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input 
                      id="name" 
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({...reservationForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({...reservationForm, phone: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Дата</Label>
                      <Input 
                        id="date" 
                        type="date"
                        value={reservationForm.date}
                        onChange={(e) => setReservationForm({...reservationForm, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Время</Label>
                      <Input 
                        id="time" 
                        type="time"
                        value={reservationForm.time}
                        onChange={(e) => setReservationForm({...reservationForm, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="guests">Количество гостей</Label>
                    <Input 
                      id="guests" 
                      type="number"
                      value={reservationForm.guests}
                      onChange={(e) => setReservationForm({...reservationForm, guests: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Комментарий</Label>
                    <Textarea 
                      id="message"
                      value={reservationForm.message}
                      onChange={(e) => setReservationForm({...reservationForm, message: e.target.value})}
                    />
                  </div>
                  <Button className="w-full bg-gold hover:bg-gold-dark text-brown">
                    Забронировать
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="lg" className="border-gold text-white hover:bg-gold hover:text-brown font-montserrat font-semibold px-8 py-4">
              <Icon name="Wine" size={20} className="mr-2" />
              Винная дегустация
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-brown text-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-playfair font-bold mb-8">О ресторане</h2>
              <div className="space-y-6 text-cream/90 font-cormorant text-lg leading-relaxed">
                <p>
                  Sole di Provenza — это место, где французская изысканность встречается 
                  с итальянской страстью к гастрономии. Наш ресторан был основан в 2015 году 
                  шеф-поваром Антонио Дель Соле, который мечтал создать пространство, 
                  объединяющее лучшие кулинарные традиции Прованса и Тосканы.
                </p>
                <p>
                  Мы гордимся нашей винной коллекцией, включающей более 300 наименований 
                  из лучших хозяйств Франции и Италии. Каждое блюдо в нашем меню — это 
                  результат тщательного отбора ингредиентов и многолетнего опыта наших поваров.
                </p>
                <p>
                  Атмосфера ресторана создана для того, чтобы каждый гость чувствовал себя 
                  частью большой гастрономической семьи. Здесь рождаются воспоминания, 
                  которые остаются на всю жизнь.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-gold mb-2">9+</div>
                  <p className="text-cream/70 font-montserrat text-sm">лет опыта</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-gold mb-2">300+</div>
                  <p className="text-cream/70 font-montserrat text-sm">видов вин</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-gold mb-2">50+</div>
                  <p className="text-cream/70 font-montserrat text-sm">авторских блюд</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img 
                  src="/img/cfbd58d7-5102-41b9-9ae2-a0e51472733b.jpg" 
                  alt="Интерьер ресторана Sole di Provenza"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 overflow-hidden rounded-2xl border-4 border-gold">
                <img 
                  src="/img/8b098023-b428-4ad8-868e-f4388d97049b.jpg" 
                  alt="Шеф-повар за работой"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-playfair font-bold text-brown mb-4">
              Меню и винная карта
            </h2>
            <p className="text-xl text-brown/70 font-cormorant max-w-2xl mx-auto">
              Изысканные блюда фьюжн-кухни в сочетании с лучшими винами мира
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: 'all', label: 'Все' },
              { key: 'appetizer', label: 'Закуски' },
              { key: 'main', label: 'Основные блюда' },
              { key: 'dessert', label: 'Десерты' },
              { key: 'wine', label: 'Вина' }
            ].map(category => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key)}
                className={selectedCategory === category.key 
                  ? "bg-gold hover:bg-gold-dark text-brown" 
                  : "border-gold text-gold hover:bg-gold hover:text-brown"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                {item.image && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-playfair font-semibold text-brown group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20">
                      {item.category === 'wine' ? 'Вино' : 
                       item.category === 'appetizer' ? 'Закуска' :
                       item.category === 'main' ? 'Основное' : 'Десерт'}
                    </Badge>
                  </div>
                  
                  <p className="text-brown/70 font-cormorant mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {item.category === 'wine' && (
                    <div className="flex gap-4 text-xs text-brown/60 mb-4">
                      {item.region && (
                        <span className="flex items-center">
                          <Icon name="MapPin" size={12} className="mr-1" />
                          {item.region}
                        </span>
                      )}
                      {item.year && (
                        <span className="flex items-center">
                          <Icon name="Calendar" size={12} className="mr-1" />
                          {item.year}
                        </span>
                      )}
                      {item.volume && (
                        <span className="flex items-center">
                          <Icon name="Wine" size={12} className="mr-1" />
                          {item.volume}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-playfair font-bold text-gold">
                      {item.price.toLocaleString()} ₽
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(item)}
                      className="bg-brown hover:bg-brown-light text-cream"
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Tasting Section */}
      <section className="py-20 bg-gradient-to-r from-gold/10 to-cream/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Icon name="Wine" size={48} className="mx-auto text-gold mb-6" />
            <h2 className="text-5xl font-playfair font-bold text-brown mb-6">
              Винные дегустации с сомелье
            </h2>
            <p className="text-xl text-brown/70 font-cormorant mb-8 leading-relaxed">
              Каждую пятницу и субботу наш сомелье проводит эксклюзивные дегустации 
              лучших вин из Франции, Италии и Нового Света. Узнайте секреты виноделия 
              и найдите идеальное сочетание с нашими блюдами.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={24} className="text-brown" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-brown mb-2">19:00 - 21:00</h3>
                <p className="text-brown/70 font-cormorant">Пятница и суббота</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={24} className="text-brown" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-brown mb-2">До 12 человек</h3>
                <p className="text-brown/70 font-cormorant">Камерная атмосфера</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={24} className="text-brown" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-brown mb-2">От 3500 ₽</h3>
                <p className="text-brown/70 font-cormorant">За участника</p>
              </div>
            </div>
            <Button size="lg" className="mt-8 bg-gold hover:bg-gold-dark text-brown font-montserrat font-semibold px-8 py-4">
              Записаться на дегустацию
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-playfair font-bold text-brown mb-4">
              Отзывы наших гостей
            </h2>
            <p className="text-xl text-brown/70 font-cormorant max-w-2xl mx-auto">
              Нам доверяют ценители высокой кухни и изысканных вин
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Елена Морозова",
                role: "Ресторанный критик",
                rating: 5,
                text: "Sole di Provenza — это настоящая жемчужина московской гастросцены. Каждое блюдо — произведение искусства, а винная карта впечатляет даже искушённых сомелье.",
                date: "2 недели назад"
              },
              {
                name: "Александр Петров",
                role: "Постоянный гость",
                rating: 5,
                text: "Уже третий раз празднуем здесь важные события. Безупречный сервис, потрясающая кухня и атмосфера, которая заставляет возвращаться снова и снова.",
                date: "1 месяц назад"
              },
              {
                name: "Мария Волкова",
                role: "Винный блогер",
                rating: 5,
                text: "Дегустация с сомелье превзошла все ожидания! Профессионализм команды и подбор вин к блюдам — на высшем уровне. Обязательно вернёмся.",
                date: "3 недели назад"
              },
              {
                name: "Дмитрий Козлов",
                role: "Бизнесмен",
                rating: 5,
                text: "Идеальное место для деловых встреч. Тихая обстановка, изысканная кухня и внимательный персонал. Все клиенты остались в восторге.",
                date: "2 недели назад"
              },
              {
                name: "Анна Соколова",
                role: "Фуд-блогер",
                rating: 5,
                text: "Трюфельное ризотто — это что-то невероятное! А десерт тирамису просто тает во рту. Фотографии не передают всей красоты подачи блюд.",
                date: "1 неделя назад"
              },
              {
                name: "Игорь Смирнов",
                role: "Сомелье",
                rating: 5,
                text: "Коллекция вин впечатляет своим разнообразием и качеством. Особенно порадовали редкие французские вина. Команда понимает толк в виноделии!",
                date: "3 недели назад"
              }
            ].map((review, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-cream/30 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mr-4">
                      <span className="text-brown font-semibold text-lg">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-playfair font-semibold text-brown">{review.name}</h3>
                      <p className="text-sm text-brown/60 font-montserrat">{review.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-gold fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-brown/80 font-cormorant leading-relaxed mb-4">
                    "{review.text}"
                  </p>
                  
                  <p className="text-xs text-brown/50 font-montserrat">
                    {review.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gold hover:bg-gold-dark text-brown font-montserrat font-semibold px-8 py-4">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Оставить отзыв
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-playfair text-xl">Ваш отзыв</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="review-name">Имя</Label>
                    <Input id="review-name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label>Оценка</Label>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Icon 
                          key={star} 
                          name="Star" 
                          size={24} 
                          className="text-gold hover:fill-current cursor-pointer transition-colors" 
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="review-text">Отзыв</Label>
                    <Textarea 
                      id="review-text" 
                      placeholder="Поделитесь своими впечатлениями о ресторане..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full bg-gold hover:bg-gold-dark text-brown">
                    Отправить отзыв
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-brown text-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-playfair font-bold mb-8">Контакты</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Icon name="MapPin" size={24} className="text-gold mt-1" />
                  <div>
                    <h3 className="text-xl font-montserrat font-semibold mb-2">Адрес</h3>
                    <p className="text-cream/80 font-cormorant">
                      Москва, ул. Тверская, 12<br />
                      ТЦ "Элитный", 2 этаж
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Icon name="Phone" size={24} className="text-gold mt-1" />
                  <div>
                    <h3 className="text-xl font-montserrat font-semibold mb-2">Телефон</h3>
                    <p className="text-cream/80 font-cormorant">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Icon name="Clock" size={24} className="text-gold mt-1" />
                  <div>
                    <h3 className="text-xl font-montserrat font-semibold mb-2">Часы работы</h3>
                    <p className="text-cream/80 font-cormorant">
                      Пн-Чт: 18:00 - 00:00<br />
                      Пт-Сб: 18:00 - 02:00<br />
                      Вс: 18:00 - 23:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-playfair font-semibold mb-8">Связаться с нами</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-name" className="text-cream">Имя</Label>
                  <Input id="contact-name" className="bg-brown-light border-gold/30 text-cream" />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-cream">Email</Label>
                  <Input id="contact-email" type="email" className="bg-brown-light border-gold/30 text-cream" />
                </div>
                <div>
                  <Label htmlFor="contact-message" className="text-cream">Сообщение</Label>
                  <Textarea id="contact-message" className="bg-brown-light border-gold/30 text-cream" rows={4} />
                </div>
                <Button className="w-full bg-gold hover:bg-gold-dark text-brown font-montserrat font-semibold">
                  Отправить сообщение
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown-dark text-cream/60 py-8 border-t border-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-playfair font-bold text-gold mb-4 md:mb-0">
              Sole di Provenza
            </div>
            <div className="flex space-x-6">
              <Icon name="Instagram" size={24} className="text-cream/60 hover:text-gold cursor-pointer transition-colors" />
              <Icon name="Facebook" size={24} className="text-cream/60 hover:text-gold cursor-pointer transition-colors" />
              <Icon name="Twitter" size={24} className="text-cream/60 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-brown-light font-cormorant">
            © 2024 Sole di Provenza. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;