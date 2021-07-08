function getEffectiveMax(a) 
{
    if (a % 100 == 0) 

        return a;
    else 
        return a - (a % 100) + 100;
}
