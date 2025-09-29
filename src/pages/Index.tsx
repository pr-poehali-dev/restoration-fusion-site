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
              <a href="#menu" className="text-cream hover:text-gold transition-colors font-montserrat">Меню</a>
              <a href="#interior" className="text-cream hover:text-gold transition-colors font-montserrat">Интерьер</a>
              <a href="#contact" className="text-cream hover:text-gold transition-colors font-montserrat">Контакты</a>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-brown">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Корзина ({cart.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-playfair text-xl">Ваш заказ</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(cartItem => (
                          <div key={cartItem.item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{cartItem.item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {cartItem.quantity} × {cartItem.item.price.toLocaleString()} ₽
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Итого:</span>
                            <span>{cartTotal.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full mt-4 bg-gold hover:bg-gold-dark text-brown">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
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