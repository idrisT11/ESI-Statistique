function getEffectiveMax(a) 
{
    if (a < 6000) //temporaire
    {
        if (a % 10 == 0) 

            return a;
        else 
            return a - (a % 10) + 10;
    }
    else
    {
        if (a % 100 == 0) 

            return a;
        else 
            return a - (a % 100) + 100;
    }

}
