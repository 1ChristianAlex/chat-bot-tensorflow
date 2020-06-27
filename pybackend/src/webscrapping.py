from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium import webdriver
import requests
from bs4 import BeautifulSoup as bfp
from selenium import webdriver
import sys
from datetime import date
import json as js
import io
import os

dir = os.path.dirname(__file__)
intents = os.path.join(dir, 'data/intents-servete.json')

sys.path.insert(0, 'D:/Program/chromedriver')


class WebScrappingSorvete:
    _optionsDrive = webdriver.ChromeOptions()

    def __init__(self):
        optionsDrive = webdriver.ChromeOptions()
        optionsDrive.add_argument('--headless')
        optionsDrive.add_argument('--no-sandbox')
        optionsDrive.add_argument('--disable-dev-shm-usage')

    def getProducts(self):
        url_robots = 'https://www.supernossoemcasa.com.br/robots.txt'
        robotReq = requests.get(url_robots)

        if robotReq.status_code == 200 or robotReq.status_code == 202:
            if 'Disallow: /mercearia/sorvetes' in robotReq.content:
                return []
        else:
            return []

        url_site_sorvete = 'https://www.supernossoemcasa.com.br/mercearia/sorvetes'
        chromeDriver = webdriver.Chrome(
            'chromedriver', chrome_options=self._optionsDrive)
        chromeDriver.delete_all_cookies()
        chromeDriver.implicitly_wait(15)

        chromeDriver.get(url_site_sorvete)
        chromeDriver.refresh()

        soupContent = bfp(chromeDriver.page_source, 'html.parser')
        productList = soupContent.find_all(class_='item-shelf')
        productsListDict = []

        for product in productList:
            productItem = {}
            productItem['title'] = product.find(
                class_='product-name').text.strip()
            productItem['price'] = product.find(class_='price').text.strip()
            productsListDict.append(productItem)

        return productsListDict


def saveProductListIntents():
    with io.open(intents, mode="r", encoding="utf-8") as file:
        data = js.load(file)
        intentsData = data['intents']
        newIntentsData = {'intents': []}
        for intentsItem in intentsData:
            if intentsItem['tag'] == "sorvetes-disponiveis" and intentsItem['lifecycle'] != f"{date.today()}":
                scrapping = WebScrappingSorvete()
                productLiscDict = scrapping.getProducts()
                intentsItem['responses'] = [
                    f"Temos {product['title']} por {product['price']}" for product in productLiscDict]

            if intentsItem['tag'] == "menor-preco-sorvete" and intentsItem['lifecycle'] != f"{date.today()}":
                scrapping = WebScrappingSorvete()
                productLiscDict = scrapping.getProducts()
                productLiscDictSorted = sorted(
                    productLiscDict, key=lambda k: k['price'])
                productListLowerPrice = productLiscDictSorted[0:5]
                producsString = [
                    f"{product['title']} por {product['price']} \n" for product in productListLowerPrice]
                intentsItem['responses'] = ["".join(producsString)]

            if intentsItem['tag'] == "maior-preco-sorvete" and intentsItem['lifecycle'] != f"{date.today()}":
                scrapping = WebScrappingSorvete()
                productLiscDict = scrapping.getProducts()
                productLiscDictSorted = sorted(
                    productLiscDict, key=lambda k: k['price'], reverse=True)
                productListMaxPrice = productLiscDictSorted[0:5]
                producsString = [
                    f"{product['title']} por {product['price']} \n" for product in productListMaxPrice]
                intentsItem['responses'] = ["".join(producsString)]

            intentsItem['lifecycle'] = f"{date.today()}"
            newIntentsData['intents'].append(intentsItem)

        file.close()
        with io.open(intents, mode="w", encoding="utf-8") as file:
            file.write(js.dumps(newIntentsData))
