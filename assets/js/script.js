class Expense {
  constructor(name, value, id) {
    this.name = name;
    this.value = value;
    this.id = id;
  }
}

//Array que va a guardar la lista de gastos
let expenses = [];

//Formatear el total a COP
let formater = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const add = (event) => {
  event.preventDefault();

  let expenseName = document.querySelector("#nombreGasto").value;
  let expenseValue = document.querySelector("#valorGasto").value;
  let id = crypto.randomUUID();

  if (!expenseName) {
    alert("Por favor, complete todos los campos");
    return;
  } else {
    const newExpense = new Expense(expenseName, Number(expenseValue), id);

    expenses.push(newExpense);

    document.querySelector("#nombreGasto").value = "";
    document.querySelector("#valorGasto").value = "";

    console.log(expenses);

    showExpenses();
  }
};

const showExpenses = () => {
  const expenseList = document.querySelector("#listaDeGastos");
  //Variable para almacenar la lista de gastos
  let list = "";

  //variable para almacenar el total de gastos
  let total = 0;

  //Para cada elemento de la lista de gastos crea un elemento li y lo concatena a la lista
  expenses.forEach((expense) => {
    list += `<li> 
    
    <span class='textList'>
    <b>${expense.name}:</b>&ensp;COP&ensp;${formater.format(
      expense.value
    )}
    </span>
    <span class='btns'>
    <button class='btnUpdate' onclick='update("${
      expense.id
    }")'>Modificar</button>
    
    <button class='btnRemove' onclick='remove("${
      expense.id
    }")'>Eliminar</button>
    </span>
    </li>`;
    total += expense.value;
  });

  //Mostrar lista de gastos actualizada
  expenseList.innerHTML = list;

  //Aggregar total
  document.querySelector("#totalGastos").innerHTML = `COP ${formater.format(
    total
  )}`;
};

const remove = (id) => {

  //obtener el indice el elemnto a eliminar
  let elementToRemove = expenses.findIndex((expense) => expense.id == id);

  //con el indice removemos el elemento de la lista
  expenses.splice(elementToRemove, 1);

  //actualizamos la tabla
  showExpenses();
};

const update = (id) => {

  //Obtenemos el indice del elemento a actualizar
  let elementToRemove = expenses.findIndex((expense) => expense.id == id);

  //Obtenemos los nuevos valores
  let newName = prompt("Ingrese el nuevo nombre del gasto");
  let newValue = prompt("Ingrese el nuevo valor del gasto");

  //Modificamos el elemento
  expenses[elementToRemove].name = newName;
  expenses[elementToRemove].value = Number(newValue);

  //Actualizamos la interfaz
  showExpenses();
};
