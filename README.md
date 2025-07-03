<h1 align="center">Bored Gamers</h1>

# Description

This was the final project of the course and I chose to build a board game app which allows the user to add their favourite board games and also add their own custom games too. I created a API in python which is linked to a data base which stores the users and the boardgames. 


# Deployment link

https://boredgamers.netlify.app/boardgames


# Getting Started/Code Installation

1. Clone the front end and back end
2. Open both folders in VSC
    - On the front end type `npm run dev` into the terminal
    - On the back end type `python manage.py runserver` into the terminal
3. Create a .env file and add `VITE_API_BASE_URL=http://127.0.0.1:8000/api`
4. Follow the link in the front end termial


# Timeframe & Working Team (Solo/Pair/Group)

I started working on this solo project on 4th June and finish on the 12th June


# Technologies Used

### Front End

  - React
  - React Router
  - JavaScript
  - CSS

### Other Tools

  - GitHub
  - Visual Studio Code
  - Postman
  - Vite
  - Python
  - Django
  - Django REST Framework


# Brief

### MVP

  - The app utilizes Django templates for rendering templates to users.
  - PostgreSQL is used as the database management system.
  - The app uses Django’s built-in session-based authentication.
  - Authorization is implemented in the app. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
  - The app has at least one data entity in addition to the User model. At least one entity must have a relationship with the User model.
  - The app has full CRUD functionality.
  - The app is deployed online so that the rest of the world can use it.


# Planning

![Wireframe](https://github.com/user-attachments/assets/c939a822-c5f2-43d4-90e0-af4a7e3ed09c)
![WinDrawLose](https://github.com/user-attachments/assets/01570cde-512e-4938-bdf0-70f4740a40b2)
![ERDBored](https://github.com/user-attachments/assets/d2e1eca9-3991-4a13-898b-c229bf82ce94)


# Build/Code Process

### Updating the boardgames

```
export const boardgameUpdate = async (boardgameId, formData) => {
    try {
        const data = new FormData();
        const skipFields = ['id', 'created_at', 'updated_at', 'owner', 'likes'];

        for (const key in formData) {
            if (skipFields.includes(key)) continue;

            const value = formData[key]
            if (value === null || value === '') continue;

            if (key === 'image_url' && typeof value === 'string') continue;

            data.append(key, value)
        }
        for (const pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }
        return await axios.put(`${BASE_URL}/boardgames/${boardgameId}/`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}
```
I problem I found whe I was adding the feature to update the boardgames was that when you would edit a file, it would remove the image file which would fail the update and give the user a error. I eventually came to this solution where the image file would save and if there is no file there then it would asume that your keeping the one before. This also works where if you remove the title and submit, it would place the preivious title there which is a perk I didn't think about.

### Like Feature

```
class BoardgameLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        boardgame = get_object_or_404(Boardgame, pk=pk)
        user = request.user

        if user in boardgame.likes.all():
            boardgame.likes.remove(user)
            liked = False
        else:
            boardgame.likes.add(user)
            liked = True

        return Response({
            "liked": liked,
            "total_likes": boardgame.likes.count()
        }, status=200)
```
In my previous app the like button worked as two different buttons however when creating the back end I thought it would be a good idea to make it a toggle. It was a very simple feature to have but it made it a lot easier on the front end to implement.

### Different API View

```
class ResultListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ResultDetailView(RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
```
For the results I realised that I didnt need to use the APIView as I wouldnt need to edit them so I decided to use the ListCreateAPIView and the RetrieveDestroyAPIView, by doing this it made my code more efficient and it allowed me to test out using a different type of view which was fun.

# Challenges

### Results Model

```
from django.db import models

# Create your models here.
class Result(models.Model):
    RESULT_CHOICES = [
        ('Win', 'Win'),
        ('Loss', 'Loss'),
        ('Draw', 'Draw'),
    ]
    boardgame = models.ForeignKey(
        to='boardgames.Boardgame',
        related_name='results',
        on_delete=models.CASCADE,
    )
    result = models.TextField(max_length=100, choices=RESULT_CHOICES)
    owner = models.ForeignKey(
        to="users.User",
        related_name="results",
        on_delete=models.CASCADE,
        blank=True
    )

    def __str__(self):
        return self.result
```
Somethink that I was thinking about alot during the creation of the back end was how would the model look for the results. After running idea with my tutor, I thought it would work best if you added buttons underneath each of the games for 'Win', 'Loss' and 'Draw'. Once I figure this out I was trying to find how would the model look, using the different types when creating the game I incorperated that in. Having three options and when the related button is pressed it would select that result and add it to the user. Once again I enjoyed that it was quite a simple solution and not as complex as I first thought.

# Wins

### CSS

I went with a similar theme to my previous projects but it just needed look right and too basic. Once I decided to change the colour to yellow I felt it made everything pop and Imporved the asthetic of the site. I wanted to make a fun and cute site and I believe that through the styling I was able to achieve that.


# Key Learnings/Takeaways

I learnt a lot about python through creating the back end. I was nice to learn about another way of going about it, even though I felt it was a lot easier to understand express, I enjoyed how simple to was to set up with django and I can see the benefits of using that type of back end as it can be set up very quickly.

# Future Improvements

- More detail with the results ( opponents and win rate with different games )
- More detail to the instructions with more of a step by step guide on how to play or link to the rules

