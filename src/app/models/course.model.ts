export class Course {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;

  constructor(id: number, name: string, description: string, price: number, category: string = 'Autre') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}
