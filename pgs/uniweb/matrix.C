// matrix.C programa que junta tots els arxius de dades en una matriu
// per despres plotar-la per cada lpongitud d'ona

#include "Riostream.h"
using namespace std;

int main()
{
  int n=31,k=0,l,i,j;
  float x[101],y[1024][101],ey[1024][101];
  char name[10];
  FILE *llist,*arxi,*mat;
  
  llist=fopen("list2.dat","r");
  
  while(!feof(llist))
    {
      fscanf (llist,"%s\n",name);
      arxi=fopen(name,"r");
      l=0;
      while(!feof(arxi))
	{
	  fscanf (arxi,"%f %f %f\n",&x[l],&y[k][l],&ey[k][l]);
	  l++;
	}
      k++;
      fclose(arxi);
    }
  fclose(llist);
  
  cout <<endl <<endl<< "Matrix 2 full"<<endl;
  
  mat=fopen("matrix2.dat","w");
  
  for (i=0;i<n;i++)
    {
      fprintf (mat, "%f ",x[i]);
      for (j=0;j<k;j++)
	{
	  fprintf (mat, "%f %f ",y[j][i],ey[j][i]);
	}
      fprintf (mat,"\n");
    } 
  fclose(mat);
  
  n=71;
  k=0;
  llist=fopen("list3.dat","r");
  
  while(!feof(llist))
    {
      fscanf (llist,"%s\n",name);
      arxi=fopen(name,"r");
      l=0;
      while(!feof(arxi))
	{
	  fscanf (arxi,"%f %f %f\n",&x[l],&y[k][l],&ey[k][l]);
	  l++;
	}
      k++;
      fclose(arxi);
    }
  fclose(llist);
  
  cout <<endl <<endl<< "Matrix 3 full"<<endl;
  
  mat=fopen("matrix3.dat","w");
  
  for (i=0;i<n;i++)
    {
      fprintf (mat, "%f ",x[i]);
      for (j=0;j<k;j++)
	{
	  fprintf (mat, "%f %f ",y[j][i],ey[j][i]);
	}
      fprintf (mat,"\n");
    } 
  fclose(mat);
  
  n=101;
  k=0;
  llist=fopen("list4.dat","r");
  
  while(!feof(llist))
    {
      fscanf (llist,"%s\n",name);
      arxi=fopen(name,"r");
      l=0;
      while(!feof(arxi))
	{
	  fscanf (arxi,"%f %f %f\n",&x[l],&y[k][l],&ey[k][l]);
	  l++;
	}
      k++;
      fclose(arxi);
    }
  fclose(llist);
  
  cout <<endl <<endl<< "Matrix 4 full"<<endl;
  
  mat=fopen("matrix4.dat","w");
  
  for (i=0;i<n;i++)
    {
      fprintf (mat, "%f ",x[i]);
      for (j=0;j<k;j++)
	{
	  fprintf (mat, "%f %f ",y[j][i],ey[j][i]);
	}
      fprintf (mat,"\n");
    } 
  fclose(mat);
}
