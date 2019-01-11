from django.conf.urls import url

from app import views

urlpatterns = [

    url(r'^$',views.handu,name='handu'),
    url(r'^register',views.register,name='register'),
    url(r'^entry/$',views.entry,name='entry')

]
