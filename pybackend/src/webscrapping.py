from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium import webdriver
import pandas as pd
import requests
from bs4 import BeautifulSoup as bfp
from selenium import webdriver
import sys

sys.path.insert(0, 'D:/Program/chromedriver')


class WebScrappingSorvete:
    _optionsDrive = webdriver.ChromeOptions()

    def __init__(self):
        optionsDrive = webdriver.ChromeOptions()
        optionsDrive.add_argument('--headless')
        optionsDrive.add_argument('--no-sandbox')
        optionsDrive.add_argument('--disable-dev-shm-usage')

    def webDrive(self):
        url_site_sorvete = 'https://www.ifood.com.br/delivery/belo-horizonte-mg/sorvete-salada-savassi-savassi/28780bcc-74e2-4094-b4c3-077542304171'
        chromeDriver = webdriver.Chrome(
            'chromedriver', chrome_options=self._optionsDrive)
        chromeDriver.get(url_site_sorvete)
        chromeDriver.implicitly_wait(50)

        soupContent = bfp(chromeDriver.page_source, 'html.parser')
        productList = soupContent.find_all(class_='dish-card-wrapper')
        productsListDict = []

        for product in productList:
            productItem = {}
            productItem['title'] = product.find(
                class_='dish-card__description').text
            productItem['description'] = product.find(
                class_='dish-card__details').text
            productItem['price'] = product.find(class_='dish-card__price').text
            productsListDict.append(productItem)

        return productsListDict


scrapping = WebScrappingSorvete()
productsList = scrapping.webDrive()
