const readline = require('node:readline/promises')

function ticketPrice(category){
    switch(category){
        case 1: 
            return 300
        case 2: 
            return 500
        case 3: 
            return 900
        default: 
            return 0
    }

}
function maxTickets(budget, price){
    let count = 0;
    while(budget >= price){
    budget -= price
    count++;
    }
    return count    
    }

function printTicketResult(category, budget){
    const cost = ticketPrice(category)
    const count = maxTickets(budget, cost)

    console.log(`Категория ${category}, билет ${cost} руб., бюджет ${budget} руб.: можно купить ${count} шт.`)
}

function deliveryPrice(distance, total){
    if (total >= 3000){
        return total
    }else{
        if(distance <= 3){
            return total
        }
        else{
            if(4 <=  distance && distance <= 10){
                return total + 200
            }
            else{
                if(distance > 10){
                    let kmAfterTen = distance - 10
                    return total + 200 + (kmAfterTen) * 25 
                }
            }
        }
    }
}

function printDelivery(distance, total){
    
    const delivery = deliveryPrice(distance,total) - total
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${delivery} руб.`)
}

function printSteps(height){
    let count = 0
for (let i = 1;i <= height;i++){

  
    if(i === 4){
        continue
    }
    
    if(i === 10){
        console.log(`Ступень ${i}`)
        count += 1
        console.log('Дальше лестница не построена')
        
        break
    }
    count += 1
    console.log(`Ступень ${i}`)

}

console.log(`Всего построено: ${count}`)
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  console.log('Выберете задачу:')
  console.log('1 — билетная касса')
  console.log('2 — доставка заказа')
  console.log('3 — лестница')
  
  const action = Number(await rl.question('Выберите задачу: '))
  switch(action){
    case 1: 
        console.log(`Ваш Выбор: ${action}`)
        const category = Number(await rl.question('Категория билета: '))
        if (category === 1 || category === 2 || category === 3){
            const budget = Number(await rl.question('Бюджет: '))
            printTicketResult(category, budget)
        }
        else{
            console.log('неизвестная категория')
            
        }
        break
    case 2: 
        console.log(`Ваш Выбор: ${action}`)
        const distance = Number(await rl.question('Расстояние: '))
        const total = Number(await rl.question('Сумма заказа: '))
        printDelivery(distance,total)
        break
    case 3: 
        console.log(`Ваш Выбор: ${action}`)
        const height = Number(await rl.question('Высота лестницы: '))
        printSteps(height)
        break
    default:
        console.log('такой задачи нет')
    }
  rl.close()
}

main()