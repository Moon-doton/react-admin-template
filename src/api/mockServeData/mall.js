import Mock from 'mockjs'

let List = []
const count = 20

const phoneImages = {
  '苹果': 'https://img.zcool.cn/community/01e5a65e4a5a06a80121985cdb7b0c.jpg@1280w_1l_2o_100sh.jpg',
  '华为': 'https://img.zcool.cn/community/01f5a65e4a5a0da80121985c5f3b0c.jpg@1280w_1l_2o_100sh.jpg',
  '小米': 'https://img.zcool.cn/community/01e5b65e4a5a0ea80121985c8e3b0c.jpg@1280w_1l_2o_100sh.jpg',
  '三星': 'https://img.zcool.cn/community/01f5c65e4a5a10a80121985c2d3b0c.jpg@1280w_1l_2o_100sh.jpg',
  'OPPO': 'https://img.zcool.cn/community/01e5d65e4a5a12a80121985c4e3b0c.jpg@1280w_1l_2o_100sh.jpg',
  'vivo': 'https://img.zcool.cn/community/01f5e65e4a5a14a80121985c6e3b0c.jpg@1280w_1l_2o_100sh.jpg',

}

const brands = ['苹果', '华为', '小米', '三星', 'OPPO', 'vivo']
const phoneModels = {
  '苹果': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max'],
  '华为': ['Mate 60 Pro', 'P60 Pro', 'Mate X5', 'nova 12 Pro'],
  '小米': ['14 Pro', '14 Ultra', 'Redmi K70 Pro', 'Civi 4 Pro'],
  '三星': ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy Z Fold5', 'Galaxy Z Flip5'],
  'OPPO': ['Find X7 Ultra', 'Find N3', 'Reno 11 Pro', 'A3 Pro'],
  'vivo': ['X100 Pro', 'X100', 'S18 Pro', 'iQOO 12 Pro'],
}

for (let i = 0; i < count; i++) {
  const brand = brands[i % brands.length]
  const models = phoneModels[brand]
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: models[i % models.length],
      brand: brand,
      'price|3000-12000': 1,
      'stock|0-500': 1,
      image: phoneImages[brand],
      description: `${brand}旗舰手机，${Mock.Random.cword(5, 15)}`,
    })
  )
}

export default {
  getMallList: config => {
    const { name = '', page = 1, limit = 8 } = config.params || {}
    const mockList = List.filter(item => {
      if (name && item.name.indexOf(name) === -1 && item.brand.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  createMall: config => {
    const { name, brand, price, stock, image, description } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      name, brand, price, stock, image, description
    })
    return { code: 20000, data: { message: '添加成功' } }
  },
  updateMall: config => {
    const { id, name, brand, price, stock, image, description } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.name = name; u.brand = brand; u.price = price
        u.stock = stock; u.image = image; u.description = description
        return true
      }
    })
    return { code: 20000, data: { message: '编辑成功' } }
  },
  deleteMall: config => {
    const { id } = JSON.parse(config.body)
    List = List.filter(u => u.id !== id)
    return { code: 20000, message: '删除成功' }
  }
}